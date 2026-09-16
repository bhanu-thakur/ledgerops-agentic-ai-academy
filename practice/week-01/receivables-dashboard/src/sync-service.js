import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateInvoices } from './validator.js';
import { ZohoBooksClient } from './zoho-client.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_FIXTURE_PATH = path.resolve(__dirname, '../data/sample-invoices.json');

/**
 * Service managing invoice data synchronization, validation, and resilience.
 * Supports both Mock mode (local synthetic fixture) and Live mode (Zoho Books API).
 * Ensures atomic updates and preserves the last successful view on failure with stale flag.
 */
export class SyncService {
  constructor(options = {}) {
    this.fixturePath = typeof options === 'string' ? options : (options.fixturePath || DEFAULT_FIXTURE_PATH);
    this.zohoClient = options.zohoClient || new ZohoBooksClient();
    this.mode = options.mode || process.env.SYNC_MODE || (this.zohoClient.isConfigured() ? 'live' : 'mock');

    this.valid = [];
    this.exceptions = [];
    this.last_successful_sync = null;
    this.is_stale = false;
    this.last_error = null;
    this.last_attempt_time = null;
  }

  /**
   * Synchronizes data from Zoho Books API or local synthetic fixture.
   * On failure (or simulated failure), retains existing data and marks snapshot stale.
   *
   * @param {object} [options={}]
   * @param {boolean} [options.simulateFailure=false]
   * @param {Array<object>} [options.rawPayload=null]
   * @param {string} [options.mode] - 'mock' or 'live'
   * @returns {Promise<{ success: boolean, is_stale: boolean, last_successful_sync: string|null, error: string|null, mode: string }>}
   */
  async sync(options = {}) {
    const { simulateFailure = false, rawPayload = null } = options;
    const activeMode = options.mode || this.mode;
    const now = new Date().toISOString();
    this.last_attempt_time = now;

    if (simulateFailure) {
      this.is_stale = true;
      this.last_error = 'Simulated Zoho Books API sync failure: 504 Gateway Timeout';
      return {
        success: false,
        is_stale: this.is_stale,
        last_successful_sync: this.last_successful_sync,
        error: this.last_error,
        mode: activeMode,
      };
    }

    try {
      let data = rawPayload;

      if (!data) {
        if (activeMode === 'live') {
          // Fetch from live Zoho Books API
          data = await this.zohoClient.fetchInvoices();
        } else {
          // Read from synthetic JSON fixture
          const fileContent = fs.readFileSync(this.fixturePath, 'utf8');
          data = JSON.parse(fileContent);
        }
      }

      const { valid, exceptions } = validateInvoices(data);

      // Atomic promotion of validated snapshot
      this.valid = valid;
      this.exceptions = exceptions;
      this.last_successful_sync = now;
      this.is_stale = false;
      this.last_error = null;
      this.mode = activeMode;

      return {
        success: true,
        is_stale: false,
        last_successful_sync: this.last_successful_sync,
        error: null,
        mode: this.mode,
        count_valid: valid.length,
        count_exceptions: exceptions.length,
      };
    } catch (err) {
      this.is_stale = true;
      this.last_error = `Sync error (${activeMode}): ${err.message}`;
      return {
        success: false,
        is_stale: true,
        last_successful_sync: this.last_successful_sync,
        error: this.last_error,
        mode: activeMode,
      };
    }
  }

  /**
   * Returns current active snapshot state and metadata.
   */
  getSnapshot() {
    return {
      mode: this.mode,
      is_configured_for_live: this.zohoClient.isConfigured(),
      valid: this.valid,
      exceptions: this.exceptions,
      last_successful_sync: this.last_successful_sync,
      is_stale: this.is_stale,
      last_error: this.last_error,
      last_attempt_time: this.last_attempt_time,
    };
  }

  /**
   * Discovers distinct currencies present in the valid dataset.
   * @returns {Array<string>}
   */
  getAvailableCurrencies() {
    const set = new Set(this.valid.map((inv) => inv.currency));
    return Array.from(set).sort();
  }
}
