import { fromCents, formatMoney } from './money.js';
import { isValidDateString } from './validator.js';

/**
 * Calculates calendar day difference between report date and due date.
 * If dueDate < reportDate, result is positive (number of days overdue).
 * If dueDate >= reportDate, result is zero or negative (not overdue).
 *
 * @param {string} reportDateStr YYYY-MM-DD
 * @param {string} dueDateStr YYYY-MM-DD
 * @returns {number} Days overdue
 */
export function calculateDaysOverdue(reportDateStr, dueDateStr) {
  if (!isValidDateString(reportDateStr)) {
    throw new Error(`Invalid report date: "${reportDateStr}". Must be YYYY-MM-DD.`);
  }
  if (!isValidDateString(dueDateStr)) {
    throw new Error(`Invalid due date: "${dueDateStr}". Must be YYYY-MM-DD.`);
  }

  const [ry, rm, rd] = reportDateStr.split('-').map(Number);
  const [dy, dm, dd] = dueDateStr.split('-').map(Number);

  const reportUtc = Date.UTC(ry, rm - 1, rd);
  const dueUtc = Date.UTC(dy, dm - 1, dd);

  const diffMs = reportUtc - dueUtc;
  return Math.round(diffMs / 86400000);
}

/**
 * Assigns an invoice to an aging bucket based on days overdue.
 * @param {number} daysOverdue
 * @returns {'current'|'1_30'|'31_60'|'61_90'|'over_90'}
 */
export function getAgingBucket(daysOverdue) {
  if (daysOverdue <= 0) {
    return 'current';
  }
  if (daysOverdue <= 30) {
    return '1_30';
  }
  if (daysOverdue <= 60) {
    return '31_60';
  }
  if (daysOverdue <= 90) {
    return '61_90';
  }
  return 'over_90';
}

export const BUCKET_METADATA = {
  current: { key: 'current', label: 'Current / Due Today', description: 'Due on or after report date' },
  '1_30': { key: '1_30', label: '1–30 Days', description: '1 to 30 calendar days overdue' },
  '31_60': { key: '31_60', label: '31–60 Days', description: '31 to 60 calendar days overdue' },
  '61_90': { key: '61_90', label: '61–90 Days', description: '61 to 90 calendar days overdue' },
  over_90: { key: 'over_90', label: 'Over 90 Days', description: '91 or more calendar days overdue' },
};

/**
 * Computes deterministic AR aging metrics for a given report date and currency.
 * Conforms to all business rules:
 * - Excludes draft and void invoices
 * - Due date equal to report date is not overdue
 * - Isolated by currency
 * - Preserves source invoice IDs behind every aggregate
 *
 * @param {Array<object>} validInvoices Validated invoice records
 * @param {string} reportDate YYYY-MM-DD
 * @param {string} [currency='USD'] Currency code
 * @returns {object} Calculated metrics, aging groups, and lineage references
 */
export function calculateReceivablesMetrics(validInvoices, reportDate, currency = 'USD') {
  if (!isValidDateString(reportDate)) {
    throw new Error(`Report date must be a valid YYYY-MM-DD string, got "${reportDate}"`);
  }

  const normalizedCurrency = (currency || 'USD').toUpperCase();

  // 1. Filter strictly by currency
  const currencyInvoices = validInvoices.filter((inv) => inv.currency === normalizedCurrency);

  // 2. Filter out non-receivable statuses: draft, void
  const eligibleInvoices = currencyInvoices.filter(
    (inv) => inv.status !== 'draft' && inv.status !== 'void'
  );

  // Initialize bucket containers
  const buckets = {
    current: { ...BUCKET_METADATA.current, count: 0, amount_cents: 0, invoice_ids: [] },
    '1_30': { ...BUCKET_METADATA['1_30'], count: 0, amount_cents: 0, invoice_ids: [] },
    '31_60': { ...BUCKET_METADATA['31_60'], count: 0, amount_cents: 0, invoice_ids: [] },
    '61_90': { ...BUCKET_METADATA['61_90'], count: 0, amount_cents: 0, invoice_ids: [] },
    over_90: { ...BUCKET_METADATA.over_90, count: 0, amount_cents: 0, invoice_ids: [] },
  };

  let openTotalCents = 0;
  let overdueTotalCents = 0;
  let currentTotalCents = 0;

  const openInvoiceIds = [];
  const overdueInvoiceIds = [];
  const currentInvoiceIds = [];

  const enrichedInvoices = [];

  for (const inv of eligibleInvoices) {
    const daysOverdue = calculateDaysOverdue(reportDate, inv.due_date);
    const isOverdue = inv.balance_cents > 0 && daysOverdue > 0;
    const bucketKey = getAgingBucket(daysOverdue);

    const enriched = {
      ...inv,
      days_overdue: daysOverdue,
      is_overdue: isOverdue,
      bucket: bucketKey,
      bucket_label: BUCKET_METADATA[bucketKey].label,
      formatted_total: formatMoney(inv.total_cents, inv.currency),
      formatted_balance: formatMoney(inv.balance_cents, inv.currency),
    };

    enrichedInvoices.push(enriched);

    // Only invoices with positive balance contribute to open receivables
    if (inv.balance_cents > 0) {
      openTotalCents += inv.balance_cents;
      openInvoiceIds.push(inv.invoice_id);

      buckets[bucketKey].count += 1;
      buckets[bucketKey].amount_cents += inv.balance_cents;
      buckets[bucketKey].invoice_ids.push(inv.invoice_id);

      if (isOverdue) {
        overdueTotalCents += inv.balance_cents;
        overdueInvoiceIds.push(inv.invoice_id);
      } else {
        currentTotalCents += inv.balance_cents;
        currentInvoiceIds.push(inv.invoice_id);
      }
    }
  }

  // Format all bucket totals
  Object.keys(buckets).forEach((key) => {
    buckets[key].amount_formatted = formatMoney(buckets[key].amount_cents, normalizedCurrency);
    buckets[key].amount_decimal = fromCents(buckets[key].amount_cents);
  });

  return {
    report_date: reportDate,
    currency: normalizedCurrency,
    summary: {
      open_receivables: {
        amount_cents: openTotalCents,
        amount_decimal: fromCents(openTotalCents),
        amount_formatted: formatMoney(openTotalCents, normalizedCurrency),
        count: openInvoiceIds.length,
        invoice_ids: openInvoiceIds,
      },
      overdue_receivables: {
        amount_cents: overdueTotalCents,
        amount_decimal: fromCents(overdueTotalCents),
        amount_formatted: formatMoney(overdueTotalCents, normalizedCurrency),
        count: overdueInvoiceIds.length,
        invoice_ids: overdueInvoiceIds,
      },
      current_receivables: {
        amount_cents: currentTotalCents,
        amount_decimal: fromCents(currentTotalCents),
        amount_formatted: formatMoney(currentTotalCents, normalizedCurrency),
        count: currentInvoiceIds.length,
        invoice_ids: currentInvoiceIds,
      },
      overdue_ratio_percent:
        openTotalCents > 0
          ? Math.round((overdueTotalCents / openTotalCents) * 1000) / 10
          : 0,
    },
    aging_buckets: buckets,
    invoices: enrichedInvoices,
    counts: {
      total_currency_records: currencyInvoices.length,
      eligible_records: eligibleInvoices.length,
      excluded_drafts_voids: currencyInvoices.length - eligibleInvoices.length,
      open_invoices: openInvoiceIds.length,
      overdue_invoices: overdueInvoiceIds.length,
    },
  };
}
