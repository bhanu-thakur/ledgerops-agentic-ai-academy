import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SyncService } from './sync-service.js';
import { calculateReceivablesMetrics } from './metrics.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../public');

// Robust .env loader
function loadEnv() {
  const possiblePaths = [
    path.resolve(__dirname, '../.env'),
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), 'zoho-receivables-dashboard/.env'),
    path.resolve(process.cwd(), 'practice/week-01/receivables-dashboard/.env'),
  ];

  for (const envPath of possiblePaths) {
    if (fs.existsSync(envPath)) {
      try {
        if (typeof process.loadEnvFile === 'function') {
          process.loadEnvFile(envPath);
        } else {
          const content = fs.readFileSync(envPath, 'utf8');
          content.split('\n').forEach((line) => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
              const [key, ...vals] = trimmed.split('=');
              process.env[key.trim()] = vals.join('=').trim();
            }
          });
        }
        break;
      } catch (err) {
        // continue
      }
    }
  }
}
loadEnv();

export function createServer(options = {}) {
  const syncService = options.syncService || new SyncService({
    fixturePath: options.fixturePath,
    mode: options.mode || process.env.SYNC_MODE || 'live',
  });

  // Perform initial synchronization asynchronously
  syncService.sync().catch(console.error);

  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
  };

  const server = http.createServer(async (req, res) => {
    // Enable CORS for local tools
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = reqUrl.pathname;

    try {
      // 1. API: Refresh Data (POST /api/refresh)
      if (pathname === '/api/refresh' && req.method === 'POST') {
        let body = '';
        for await (const chunk of req) {
          body += chunk;
        }

        let simulateFailure = reqUrl.searchParams.get('fail') === 'true';
        let requestedMode = reqUrl.searchParams.get('mode') || null;

        if (body.trim()) {
          try {
            const parsed = JSON.parse(body);
            if (parsed.simulate_failure !== undefined) {
              simulateFailure = Boolean(parsed.simulate_failure);
            }
            if (parsed.mode) {
              requestedMode = parsed.mode;
            }
          } catch {
            // ignore JSON parse error in body if any
          }
        }

        const syncResult = await syncService.sync({ simulateFailure, mode: requestedMode });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(syncResult));
        return;
      }

      // 2. API: Status & Sync Health (GET /api/status)
      if (pathname === '/api/status' && req.method === 'GET') {
        const snapshot = syncService.getSnapshot();
        const responseData = {
          mode: snapshot.mode,
          is_configured_for_live: snapshot.is_configured_for_live,
          is_stale: snapshot.is_stale,
          last_successful_sync: snapshot.last_successful_sync,
          last_error: snapshot.last_error,
          last_attempt_time: snapshot.last_attempt_time,
          available_currencies: syncService.getAvailableCurrencies(),
          valid_count: snapshot.valid.length,
          exceptions_count: snapshot.exceptions.length,
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData));
        return;
      }

      // 3. API: Receivables Metrics & Buckets (GET /api/metrics)
      if (pathname === '/api/metrics' && req.method === 'GET') {
        const reportDate = reqUrl.searchParams.get('report_date') || '2026-08-31';
        const currency = (reqUrl.searchParams.get('currency') || 'USD').toUpperCase();
        const snapshot = syncService.getSnapshot();

        const metrics = calculateReceivablesMetrics(snapshot.valid, reportDate, currency);

        const responseData = {
          ...metrics,
          sync_health: {
            is_stale: snapshot.is_stale,
            last_successful_sync: snapshot.last_successful_sync,
            last_error: snapshot.last_error,
            last_attempt_time: snapshot.last_attempt_time,
          },
          available_currencies: syncService.getAvailableCurrencies(),
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData));
        return;
      }

      // 4. API: Filtered Invoices for Drilldown (GET /api/invoices)
      if (pathname === '/api/invoices' && req.method === 'GET') {
        const reportDate = reqUrl.searchParams.get('report_date') || '2026-08-31';
        const currency = (reqUrl.searchParams.get('currency') || 'USD').toUpperCase();
        const filter = reqUrl.searchParams.get('filter') || 'all'; // 'open', 'overdue', 'current', or bucket key
        const snapshot = syncService.getSnapshot();

        const metrics = calculateReceivablesMetrics(snapshot.valid, reportDate, currency);
        let filtered = metrics.invoices;

        if (filter === 'open') {
          filtered = filtered.filter((i) => i.balance_cents > 0);
        } else if (filter === 'overdue') {
          filtered = filtered.filter((i) => i.is_overdue);
        } else if (filter === 'current') {
          filtered = filtered.filter((i) => i.balance_cents > 0 && !i.is_overdue);
        } else if (['1_30', '31_60', '61_90', 'over_90'].includes(filter)) {
          filtered = filtered.filter((i) => i.balance_cents > 0 && i.bucket === filter);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            report_date: reportDate,
            currency,
            filter,
            count: filtered.length,
            invoices: filtered,
          })
        );
        return;
      }

      // 5. API: Quarantined Invalid Records (GET /api/exceptions)
      if (pathname === '/api/exceptions' && req.method === 'GET') {
        const snapshot = syncService.getSnapshot();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            count: snapshot.exceptions.length,
            exceptions: snapshot.exceptions,
          })
        );
        return;
      }

      // 6. Static File Serving from /public
      let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);

      // Prevent directory traversal
      if (!filePath.startsWith(PUBLIC_DIR)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Access Denied');
        return;
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
        return;
      }

      // 404 Not Found
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Endpoint or resource not found', path: pathname }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error', message: err.message }));
    }
  });

  return { server, syncService };
}

// Automatically start if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const PORT = process.env.PORT || 3000;
  const { server } = createServer();
  server.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`  Zoho Receivables Operations Dashboard is running!`);
    console.log(`  URL: http://localhost:${PORT}`);
    console.log(`  Press Ctrl+C to stop`);
    console.log(`======================================================\n`);
  });
}
