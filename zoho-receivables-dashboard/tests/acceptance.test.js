import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { toCents, fromCents, formatMoney } from '../src/money.js';
import { validateInvoices, isValidDateString } from '../src/validator.js';
import {
  calculateReceivablesMetrics,
  calculateDaysOverdue,
  getAgingBucket,
} from '../src/metrics.js';
import { SyncService } from '../src/sync-service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FIXTURE_PATH = path.resolve(__dirname, '../data/sample-invoices.json');

describe('Zoho Receivables Operations Dashboard - Acceptance Test Suite', () => {
  // Test fixture strictly representing teaching example A, B, C, D
  const teachingSample = [
    {
      invoice_id: 'INV-A',
      customer_id: 'CUST-001',
      customer_name: 'Acme Industrial Supplies',
      date: '2026-07-01',
      due_date: '2026-08-01',
      status: 'issued',
      currency: 'USD',
      total: 1000.0,
      balance: 600.0,
    },
    {
      invoice_id: 'INV-B',
      customer_id: 'CUST-002',
      customer_name: 'Beta Logistical Services',
      date: '2026-08-05',
      due_date: '2026-09-05',
      status: 'sent',
      currency: 'USD',
      total: 500.0,
      balance: 500.0,
    },
    {
      invoice_id: 'INV-C',
      customer_id: 'CUST-003',
      customer_name: 'Gamma Consulting Group',
      date: '2026-06-15',
      due_date: '2026-07-15',
      status: 'paid',
      currency: 'USD',
      total: 800.0,
      balance: 0.0,
    },
    {
      invoice_id: 'INV-D',
      customer_id: 'CUST-004',
      customer_name: 'Delta Design Works',
      date: '2026-07-15',
      due_date: '2026-08-15',
      status: 'draft',
      currency: 'USD',
      total: 300.0,
      balance: 300.0,
    },
  ];

  // --------------------------------------------------------------------------
  // Acceptance Test 1: Hand-worked sample totals match exactly
  // --------------------------------------------------------------------------
  it('Acceptance Test 1: Hand-worked sample totals match exactly (Teaching Example)', () => {
    const { valid } = validateInvoices(teachingSample);
    const reportDate = '2026-08-31';

    const metrics = calculateReceivablesMetrics(valid, reportDate, 'USD');

    // Expected open receivables: $1,100 ($600 for A and $500 for B)
    assert.equal(metrics.summary.open_receivables.amount_cents, 110000);
    assert.equal(metrics.summary.open_receivables.amount_decimal, '1100.00');
    assert.equal(metrics.summary.open_receivables.count, 2);

    // Expected overdue receivables: $600 (Invoice A, 30 days overdue)
    assert.equal(metrics.summary.overdue_receivables.amount_cents, 60000);
    assert.equal(metrics.summary.overdue_receivables.amount_decimal, '600.00');
    assert.equal(metrics.summary.overdue_receivables.count, 1);
    assert.deepEqual(metrics.summary.overdue_receivables.invoice_ids, ['INV-A']);

    // Expected current receivables: $500 (Invoice B, due 2026-09-05)
    assert.equal(metrics.summary.current_receivables.amount_cents, 50000);
    assert.equal(metrics.summary.current_receivables.amount_decimal, '500.00');
    assert.equal(metrics.summary.current_receivables.count, 1);
    assert.deepEqual(metrics.summary.current_receivables.invoice_ids, ['INV-B']);

    // Expected aging buckets:
    // Invoice A is 30 days overdue: belongs in 1-30 day bucket
    assert.equal(metrics.aging_buckets['1_30'].amount_cents, 60000);
    assert.equal(metrics.aging_buckets['1_30'].count, 1);
    assert.deepEqual(metrics.aging_buckets['1_30'].invoice_ids, ['INV-A']);

    // Invoice B is current: belongs in current bucket
    assert.equal(metrics.aging_buckets['current'].amount_cents, 50000);
    assert.equal(metrics.aging_buckets['current'].count, 1);
    assert.deepEqual(metrics.aging_buckets['current'].invoice_ids, ['INV-B']);

    // Invoice C (paid, balance 0) contributes zero
    // Invoice D (draft) is excluded
    assert.equal(metrics.aging_buckets['31_60'].amount_cents, 0);
    assert.equal(metrics.aging_buckets['61_90'].amount_cents, 0);
    assert.equal(metrics.aging_buckets['over_90'].amount_cents, 0);
  });

  // --------------------------------------------------------------------------
  // Acceptance Test 2: Drafts and void invoices are excluded
  // --------------------------------------------------------------------------
  it('Acceptance Test 2: Drafts and void invoices are excluded', () => {
    const mixedRecords = [
      {
        invoice_id: 'INV-VALID',
        customer_id: 'C-1',
        customer_name: 'Valid Corp',
        date: '2026-08-01',
        due_date: '2026-08-20',
        status: 'sent',
        currency: 'USD',
        total: 100,
        balance: 100,
      },
      {
        invoice_id: 'INV-DRAFT',
        customer_id: 'C-2',
        customer_name: 'Draft Corp',
        date: '2026-08-01',
        due_date: '2026-08-10',
        status: 'draft',
        currency: 'USD',
        total: 500,
        balance: 500,
      },
      {
        invoice_id: 'INV-VOID',
        customer_id: 'C-3',
        customer_name: 'Void Corp',
        date: '2026-08-01',
        due_date: '2026-08-10',
        status: 'void',
        currency: 'USD',
        total: 700,
        balance: 700,
      },
    ];

    const { valid } = validateInvoices(mixedRecords);
    const metrics = calculateReceivablesMetrics(valid, '2026-08-31', 'USD');

    // Only INV-VALID must count
    assert.equal(metrics.summary.open_receivables.amount_cents, 10000);
    assert.deepEqual(metrics.summary.open_receivables.invoice_ids, ['INV-VALID']);
    assert.equal(metrics.counts.excluded_drafts_voids, 2);

    // Invoices list in output does not include draft or void
    const returnedIds = metrics.invoices.map((i) => i.invoice_id);
    assert.ok(!returnedIds.includes('INV-DRAFT'), 'Draft invoice must not be present');
    assert.ok(!returnedIds.includes('INV-VOID'), 'Void invoice must not be present');
  });

  // --------------------------------------------------------------------------
  // Acceptance Test 3: A due date equal to the report date is not overdue
  // --------------------------------------------------------------------------
  it('Acceptance Test 3: A due date equal to the report date is not overdue', () => {
    const boundaryRecord = [
      {
        invoice_id: 'INV-TODAY',
        customer_id: 'C-B',
        customer_name: 'Due Today Corp',
        date: '2026-08-01',
        due_date: '2026-08-31', // Equal to report date
        status: 'sent',
        currency: 'USD',
        total: 400.0,
        balance: 400.0,
      },
    ];

    const { valid } = validateInvoices(boundaryRecord);
    const metrics = calculateReceivablesMetrics(valid, '2026-08-31', 'USD');

    assert.equal(metrics.summary.open_receivables.amount_cents, 40000);
    assert.equal(metrics.summary.overdue_receivables.amount_cents, 0, 'Due date equal to report date must not be overdue');
    assert.equal(metrics.summary.current_receivables.amount_cents, 40000);

    const inv = metrics.invoices[0];
    assert.equal(inv.days_overdue, 0);
    assert.equal(inv.is_overdue, false);
    assert.equal(inv.bucket, 'current');
  });

  // --------------------------------------------------------------------------
  // Acceptance Test 4: USD and INR totals are never added together
  // --------------------------------------------------------------------------
  it('Acceptance Test 4: USD and INR totals are never added together', () => {
    const multiCurrencyRecords = [
      {
        invoice_id: 'USD-1',
        customer_id: 'C-US',
        customer_name: 'US Client',
        date: '2026-08-01',
        due_date: '2026-08-15',
        status: 'sent',
        currency: 'USD',
        total: 1000,
        balance: 1000,
      },
      {
        invoice_id: 'INR-1',
        customer_id: 'C-IN',
        customer_name: 'India Client',
        date: '2026-08-01',
        due_date: '2026-08-15',
        status: 'sent',
        currency: 'INR',
        total: 80000,
        balance: 80000,
      },
    ];

    const { valid } = validateInvoices(multiCurrencyRecords);

    // Query USD
    const usdMetrics = calculateReceivablesMetrics(valid, '2026-08-31', 'USD');
    assert.equal(usdMetrics.currency, 'USD');
    assert.equal(usdMetrics.summary.open_receivables.amount_cents, 100000); // 1000.00
    assert.deepEqual(usdMetrics.summary.open_receivables.invoice_ids, ['USD-1']);

    // Query INR
    const inrMetrics = calculateReceivablesMetrics(valid, '2026-08-31', 'INR');
    assert.equal(inrMetrics.currency, 'INR');
    assert.equal(inrMetrics.summary.open_receivables.amount_cents, 8000000); // 80000.00
    assert.deepEqual(inrMetrics.summary.open_receivables.invoice_ids, ['INR-1']);

    // Verify neither query contaminated the other
    assert.ok(!usdMetrics.summary.open_receivables.invoice_ids.includes('INR-1'));
    assert.ok(!inrMetrics.summary.open_receivables.invoice_ids.includes('USD-1'));
  });

  // --------------------------------------------------------------------------
  // Acceptance Test 5: Missing required data creates a visible error
  // --------------------------------------------------------------------------
  it('Acceptance Test 5: Missing required data creates a visible error', () => {
    const malformedRecords = [
      {
        // Missing invoice_id
        customer_id: 'C-1',
        customer_name: 'Missing ID Corp',
        date: '2026-08-01',
        due_date: '2026-08-20',
        status: 'sent',
        currency: 'USD',
        total: 100,
        balance: 100,
      },
      {
        // Missing customer_id
        invoice_id: 'INV-NO-CUST',
        customer_name: 'No Customer ID',
        date: '2026-08-01',
        due_date: '2026-08-20',
        status: 'sent',
        currency: 'USD',
        total: 100,
        balance: 100,
      },
      {
        // Unparseable balance amount
        invoice_id: 'INV-BAD-BAL',
        customer_id: 'C-3',
        customer_name: 'Bad Balance Corp',
        date: '2026-08-01',
        due_date: '2026-08-20',
        status: 'sent',
        currency: 'USD',
        total: 500,
        balance: 'not-a-number',
      },
      {
        // Invalid date string
        invoice_id: 'INV-BAD-DATE',
        customer_id: 'C-4',
        customer_name: 'Bad Date Corp',
        date: 'invalid-date',
        due_date: '2026-08-20',
        status: 'sent',
        currency: 'USD',
        total: 200,
        balance: 200,
      },
    ];

    const { valid, exceptions } = validateInvoices(malformedRecords);

    // All 4 malformed records must be captured in exceptions
    assert.equal(exceptions.length, 4);
    assert.equal(valid.length, 0);

    // Check specific failure reasons are captured
    assert.ok(exceptions[0].reasons.some((r) => r.includes('invoice_id')));
    assert.ok(exceptions[1].reasons.some((r) => r.includes('customer_id')));
    assert.ok(exceptions[2].reasons.some((r) => r.includes('balance')));
    assert.ok(exceptions[3].reasons.some((r) => r.includes('date')));
  });

  // --------------------------------------------------------------------------
  // Acceptance Test 6: A failed refresh keeps the last successful view and marks it stale
  // --------------------------------------------------------------------------
  it('Acceptance Test 6: A failed refresh keeps the last successful view and marks it stale', async () => {
    const syncService = new SyncService(FIXTURE_PATH);

    // 1. First sync succeeds
    const initialSync = await syncService.sync({ simulateFailure: false });
    assert.equal(initialSync.success, true);
    assert.equal(initialSync.is_stale, false);
    assert.ok(initialSync.last_successful_sync !== null);

    const snapshotBeforeFail = syncService.getSnapshot();
    const validCountBefore = snapshotBeforeFail.valid.length;
    const initialSyncTimestamp = snapshotBeforeFail.last_successful_sync;
    assert.ok(validCountBefore > 0);

    // 2. Refresh fails (e.g. simulated Zoho timeout)
    const failedSync = await syncService.sync({ simulateFailure: true });
    assert.equal(failedSync.success, false);
    assert.equal(failedSync.is_stale, true);

    const snapshotAfterFail = syncService.getSnapshot();

    // Prior good data is intact!
    assert.equal(snapshotAfterFail.valid.length, validCountBefore, 'Valid records must not be wiped on failed refresh');
    assert.equal(snapshotAfterFail.is_stale, true, 'Snapshot must be flagged as stale');
    assert.equal(snapshotAfterFail.last_successful_sync, initialSyncTimestamp, 'Original successful timestamp must be preserved');
    assert.ok(snapshotAfterFail.last_error !== null, 'Failure reason must be recorded');
  });

  // --------------------------------------------------------------------------
  // Acceptance Test 7: Every headline number opens the contributing invoices
  // --------------------------------------------------------------------------
  it('Acceptance Test 7: Every headline number opens the contributing invoices (Lineage)', () => {
    const { valid } = validateInvoices(teachingSample);
    const metrics = calculateReceivablesMetrics(valid, '2026-08-31', 'USD');

    // 1. Open total lineage
    assert.deepEqual(
      metrics.summary.open_receivables.invoice_ids.sort(),
      ['INV-A', 'INV-B'].sort(),
      'Open total must list exactly the contributing invoice IDs'
    );

    // 2. Overdue total lineage
    assert.deepEqual(
      metrics.summary.overdue_receivables.invoice_ids,
      ['INV-A'],
      'Overdue total must list exactly the overdue invoice IDs'
    );

    // 3. Current total lineage
    assert.deepEqual(
      metrics.summary.current_receivables.invoice_ids,
      ['INV-B'],
      'Current total must list exactly the current invoice IDs'
    );

    // 4. Aging bucket lineage
    assert.deepEqual(metrics.aging_buckets['1_30'].invoice_ids, ['INV-A']);
    assert.deepEqual(metrics.aging_buckets['current'].invoice_ids, ['INV-B']);

    // 5. Verify detailed invoice objects exist and have full source keys
    const invA = metrics.invoices.find((i) => i.invoice_id === 'INV-A');
    assert.ok(invA);
    assert.equal(invA.customer_id, 'CUST-001');
    assert.equal(invA.customer_name, 'Acme Industrial Supplies');
    assert.equal(invA.balance_cents, 60000);
    assert.equal(invA.days_overdue, 30);
    assert.equal(invA.bucket, '1_30');
  });

  // --------------------------------------------------------------------------
  // Additional Edge Case & Aging Boundary Tests
  // --------------------------------------------------------------------------
  describe('Boundary Tests & Minor-unit Financial Math', () => {
    it('Accurately categorizes aging boundary intervals', () => {
      assert.equal(getAgingBucket(-5), 'current');
      assert.equal(getAgingBucket(0), 'current');
      assert.equal(getAgingBucket(1), '1_30');
      assert.equal(getAgingBucket(30), '1_30');
      assert.equal(getAgingBucket(31), '31_60');
      assert.equal(getAgingBucket(60), '31_60');
      assert.equal(getAgingBucket(61), '61_90');
      assert.equal(getAgingBucket(90), '61_90');
      assert.equal(getAgingBucket(91), 'over_90');
      assert.equal(getAgingBucket(365), 'over_90');
    });

    it('Prevents floating point errors with minor units (cents)', () => {
      assert.equal(toCents(0.1) + toCents(0.2), 30); // in standard float, 0.1 + 0.2 = 0.30000000000000004
      assert.equal(fromCents(30), '0.30');
      assert.equal(toCents('1234.56'), 123456);
      assert.equal(fromCents(123456), '1234.56');
      assert.equal(formatMoney(123456, 'USD'), '$1,234.56');
      assert.equal(formatMoney(5000000, 'INR'), '₹50,000.00');
    });
  });
});
