/**
 * Deterministic exact minor-unit (cents) financial math utilities.
 * Conforms to accounting principle of integer cents representation
 * to eliminate binary floating-point rounding discrepancies.
 */

/**
 * Converts a currency amount (number or string) into integer minor units (cents).
 * e.g., 1000.50 -> 100050, "600" -> 60000, 0 -> 0.
 * @param {number|string} amount
 * @returns {number} Integer minor units (cents)
 */
export function toCents(amount) {
  if (amount === null || amount === undefined) {
    throw new Error('Amount cannot be null or undefined');
  }

  if (typeof amount === 'number') {
    if (!Number.isFinite(amount)) {
      throw new Error(`Amount must be a finite number, received ${amount}`);
    }
    // Round to 2 decimal places to prevent float artifacts before scaling
    const normalized = Math.round(amount * 100);
    return normalized;
  }

  if (typeof amount === 'string') {
    const trimmed = amount.trim().replace(/,/g, '');
    if (!/^-?\d+(\.\d{1,2})?$/.test(trimmed)) {
      throw new Error(`Invalid monetary amount format: "${amount}"`);
    }
    const parts = trimmed.split('.');
    const dollars = parseInt(parts[0], 10);
    let cents = 0;
    if (parts.length > 1) {
      cents = parseInt(parts[1].padEnd(2, '0').slice(0, 2), 10);
    }
    return dollars >= 0 ? dollars * 100 + cents : dollars * 100 - cents;
  }

  throw new Error(`Unsupported amount type: ${typeof amount}`);
}

/**
 * Converts integer minor units (cents) to a standard decimal string (e.g. 100050 -> "1000.50").
 * @param {number} cents
 * @returns {string}
 */
export function fromCents(cents) {
  if (typeof cents !== 'number' || !Number.isInteger(cents)) {
    throw new Error(`Expected integer cents, received ${cents}`);
  }
  const sign = cents < 0 ? '-' : '';
  const abs = Math.abs(cents);
  const dollars = Math.floor(abs / 100);
  const remainder = abs % 100;
  return `${sign}${dollars}.${remainder.toString().padStart(2, '0')}`;
}

/**
 * Formats integer minor units into human-readable currency representation.
 * @param {number} cents
 * @param {string} [currency='USD']
 * @returns {string}
 */
export function formatMoney(cents, currency = 'USD') {
  const decimalVal = Math.abs(cents) / 100;
  const sign = cents < 0 ? '-' : '';
  const formatted = decimalVal.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const symbols = {
    USD: '$',
    INR: '₹',
    EUR: '€',
    GBP: '£',
  };

  const symbol = symbols[currency] || `${currency} `;
  return `${sign}${symbol}${formatted}`;
}
