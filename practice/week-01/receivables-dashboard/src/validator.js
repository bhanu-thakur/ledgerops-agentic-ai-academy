import { toCents } from './money.js';

/**
 * Validates ISO 8601 YYYY-MM-DD date string.
 * @param {string} dateStr
 * @returns {boolean}
 */
export function isValidDateString(dateStr) {
  if (typeof dateStr !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return false;
  }
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/**
 * Validates an array of raw invoice records.
 * Quarantines any invalid/incomplete records with explicit error descriptions.
 * Conforms to Acceptance Test 5: "Missing required data creates a visible error."
 *
 * @param {Array<object>} rawRecords
 * @returns {{ valid: Array<object>, exceptions: Array<object> }}
 */
export function validateInvoices(rawRecords) {
  if (!Array.isArray(rawRecords)) {
    return {
      valid: [],
      exceptions: [
        {
          index: 0,
          invoice_id: null,
          reasons: ['Payload is not an array of records'],
          raw_record: rawRecords,
        },
      ],
    };
  }

  const valid = [];
  const exceptions = [];

  rawRecords.forEach((record, index) => {
    const reasons = [];

    if (!record || typeof record !== 'object') {
      exceptions.push({
        index,
        invoice_id: null,
        reasons: ['Record is not a valid object'],
        raw_record: record,
      });
      return;
    }

    // 1. Invoice ID
    if (!record.invoice_id || typeof record.invoice_id !== 'string' || !record.invoice_id.trim()) {
      reasons.push('Missing or empty required field: invoice_id');
    }

    // 2. Customer ID
    if (!record.customer_id || typeof record.customer_id !== 'string' || !record.customer_id.trim()) {
      reasons.push('Missing or empty required field: customer_id');
    }

    // 3. Customer Name
    if (!record.customer_name || typeof record.customer_name !== 'string' || !record.customer_name.trim()) {
      reasons.push('Missing or empty required field: customer_name');
    }

    // 4. Issue Date
    if (!isValidDateString(record.date)) {
      reasons.push(`Invalid or missing issue date: "${record.date}". Expected format YYYY-MM-DD.`);
    }

    // 5. Due Date
    if (!isValidDateString(record.due_date)) {
      reasons.push(`Invalid or missing due date: "${record.due_date}". Expected format YYYY-MM-DD.`);
    }

    // 6. Status
    if (!record.status || typeof record.status !== 'string' || !record.status.trim()) {
      reasons.push('Missing or empty required field: status');
    }

    // 7. Currency
    if (!record.currency || typeof record.currency !== 'string' || !record.currency.trim()) {
      reasons.push('Missing or empty required field: currency');
    }

    // 8. Total amount
    let totalCents = 0;
    try {
      totalCents = toCents(record.total);
      if (totalCents < 0) {
        reasons.push(`Total amount cannot be negative: received ${record.total}`);
      }
    } catch (err) {
      reasons.push(`Unparseable total amount: "${record.total}" (${err.message})`);
    }

    // 9. Current balance
    let balanceCents = 0;
    try {
      balanceCents = toCents(record.balance);
      if (balanceCents < 0) {
        reasons.push(`Balance amount cannot be negative: received ${record.balance}`);
      }
    } catch (err) {
      reasons.push(`Unparseable balance amount: "${record.balance}" (${err.message})`);
    }

    if (reasons.length > 0) {
      exceptions.push({
        index,
        invoice_id: record.invoice_id || null,
        reasons,
        raw_record: record,
      });
    } else {
      valid.push({
        invoice_id: record.invoice_id.trim(),
        customer_id: record.customer_id.trim(),
        customer_name: record.customer_name.trim(),
        date: record.date.trim(),
        due_date: record.due_date.trim(),
        status: record.status.trim().toLowerCase(),
        currency: record.currency.trim().toUpperCase(),
        total: record.total,
        balance: record.balance,
        total_cents: totalCents,
        balance_cents: balanceCents,
      });
    }
  });

  return { valid, exceptions };
}
