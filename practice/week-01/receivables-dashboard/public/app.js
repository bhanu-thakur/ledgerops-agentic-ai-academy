/**
 * Frontend Controller for Receivables Operations Dashboard
 */

const state = {
  reportDate: '2026-08-31',
  currency: 'INR',
  activeFilter: null, // null/'all', 'open', 'overdue', 'current', or bucket key
  metricsData: null,
  exceptionsData: [],
  syncStatus: null,
};

// DOM Elements
const reportDateInput = document.getElementById('reportDateInput');
const currencySelect = document.getElementById('currencySelect');
const btnRefresh = document.getElementById('btnRefresh');
const btnSimulateFail = document.getElementById('btnSimulateFail');

const staleAlertBanner = document.getElementById('staleAlertBanner');
const staleAlertMessage = document.getElementById('staleAlertMessage');
const staleAlertTimestamp = document.getElementById('staleAlertTimestamp');

const syncStatusBadge = document.getElementById('syncStatusBadge');
const lastSyncTime = document.getElementById('lastSyncTime');
const lastAttemptTime = document.getElementById('lastAttemptTime');
const exceptionCountBadge = document.getElementById('exceptionCountBadge');

// KPI elements
const kpiOpenCard = document.getElementById('kpiOpenCard');
const kpiOverdueCard = document.getElementById('kpiOverdueCard');
const kpiCurrentCard = document.getElementById('kpiCurrentCard');
const valOpenAmount = document.getElementById('valOpenAmount');
const valOpenCount = document.getElementById('valOpenCount');
const valOverdueAmount = document.getElementById('valOverdueAmount');
const valOverdueCount = document.getElementById('valOverdueCount');
const valCurrentAmount = document.getElementById('valCurrentAmount');
const valCurrentCount = document.getElementById('valCurrentCount');
const valOverdueRatio = document.getElementById('valOverdueRatio');

// Aging Bucket Elements
const bucketKeys = ['current', '1_30', '31_60', '61_90', 'over_90'];

// Table elements
const activeFilterBadge = document.getElementById('activeFilterBadge');
const activeFilterText = document.getElementById('activeFilterText');
const btnClearFilter = document.getElementById('btnClearFilter');
const tableSummaryCount = document.getElementById('tableSummaryCount');
const invoicesTableBody = document.getElementById('invoicesTableBody');

// Exceptions elements
const exceptionsBadge = document.getElementById('exceptionsBadge');
const exceptionsTableBody = document.getElementById('exceptionsTableBody');

// Modal elements
const invoiceModal = document.getElementById('invoiceModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

/**
 * Format timestamp string into readable local time.
 */
function formatTimestamp(isoStr) {
  if (!isoStr) return 'Never';
  try {
    const d = new Date(isoStr);
    return d.toLocaleString('en-US', {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return isoStr;
  }
}

/**
 * Loads dashboard metrics from API.
 */
async function loadMetrics() {
  try {
    const url = `/api/metrics?report_date=${encodeURIComponent(state.reportDate)}&currency=${encodeURIComponent(state.currency)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    state.metricsData = data;
    renderMetrics(data);
    renderInvoicesTable();
  } catch (err) {
    console.error('Failed to load metrics:', err);
  }
}

/**
 * Loads quarantined exceptions from API.
 */
async function loadExceptions() {
  try {
    const res = await fetch('/api/exceptions');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    state.exceptionsData = data.exceptions || [];
    renderExceptions(state.exceptionsData);
  } catch (err) {
    console.error('Failed to load exceptions:', err);
  }
}

/**
 * Loads sync status metadata from API.
 */
async function loadStatus() {
  try {
    const res = await fetch('/api/status');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    state.syncStatus = data;
    renderSyncStatus(data);
  } catch (err) {
    console.error('Failed to load status:', err);
  }
}

/**
 * Triggers refresh on server.
 */
async function triggerRefresh(simulateFailure = false) {
  try {
    btnRefresh.disabled = true;
    btnSimulateFail.disabled = true;

    const payload = { simulate_failure: simulateFailure, mode: 'live' };

    const res = await fetch('/api/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await res.json();

    // Reload all views
    await Promise.all([loadStatus(), loadMetrics(), loadExceptions()]);
  } catch (err) {
    console.error('Refresh request failed:', err);
  } finally {
    btnRefresh.disabled = false;
    btnSimulateFail.disabled = false;
  }
}

/**
 * Renders Sync Health, Badges, and Stale Warning Banner.
 */
function renderSyncStatus(status) {
  lastSyncTime.textContent = formatTimestamp(status.last_successful_sync);
  lastAttemptTime.textContent = formatTimestamp(status.last_attempt_time);

  if (status.is_stale) {
    staleAlertBanner.classList.remove('hidden');
    staleAlertMessage.textContent = `${status.last_error || 'Upstream sync failure'}. Showing last good snapshot from ${formatTimestamp(status.last_successful_sync)}.`;
    staleAlertTimestamp.textContent = `Failure recorded at ${formatTimestamp(status.last_attempt_time)}`;

    syncStatusBadge.textContent = 'STALE DATA';
    syncStatusBadge.className = 'status-pill status-stale';
  } else {
    staleAlertBanner.classList.add('hidden');
    syncStatusBadge.textContent = 'Live Zoho Books (Connected)';
    syncStatusBadge.className = 'status-pill status-healthy';
  }

  exceptionCountBadge.textContent = status.exceptions_count || 0;

  // Sync available currencies dropdown if needed
  if (Array.isArray(status.available_currencies) && status.available_currencies.length > 0) {
    currencySelect.innerHTML = '';
    status.available_currencies.forEach((cur) => {
      const opt = document.createElement('option');
      opt.value = cur;
      opt.textContent = `${cur} (${cur === 'USD' ? '$' : cur === 'INR' ? '₹' : cur})`;
      currencySelect.appendChild(opt);
    });

    if (!status.available_currencies.includes(state.currency)) {
      state.currency = status.available_currencies[0];
    }
    currencySelect.value = state.currency;
  }
}

/**
 * Renders Headline KPIs and Aging Breakdown.
 */
function renderMetrics(data) {
  const summary = data.summary;
  const buckets = data.aging_buckets;

  // Headline numbers
  valOpenAmount.textContent = summary.open_receivables.amount_formatted;
  valOpenCount.textContent = `${summary.open_receivables.count} invoices`;

  valOverdueAmount.textContent = summary.overdue_receivables.amount_formatted;
  valOverdueCount.textContent = `${summary.overdue_receivables.count} invoices`;

  valCurrentAmount.textContent = summary.current_receivables.amount_formatted;
  valCurrentCount.textContent = `${summary.current_receivables.count} invoices`;

  valOverdueRatio.textContent = `${summary.overdue_ratio_percent}%`;

  // Aging Cards
  const totalOpenCents = summary.open_receivables.amount_cents || 1;

  bucketKeys.forEach((key) => {
    const bucket = buckets[key];
    const amountEl = document.getElementById(`bucket-amount-${key}`);
    const countEl = document.getElementById(`bucket-count-${key}`);
    const barEl = document.getElementById(`bucket-bar-${key}`);

    if (bucket && amountEl && countEl && barEl) {
      amountEl.textContent = bucket.amount_formatted;
      countEl.textContent = `${bucket.count} invoice${bucket.count === 1 ? '' : 's'}`;

      const pct = Math.min(100, Math.round((bucket.amount_cents / totalOpenCents) * 100));
      barEl.style.width = `${pct}%`;
    }
  });

  updateFilterHighlights();
}

/**
 * Highlights the active filter card.
 */
function updateFilterHighlights() {
  document.querySelectorAll('.kpi-card, .aging-card').forEach((el) => {
    el.classList.remove('active-selection');
  });

  if (!state.activeFilter || state.activeFilter === 'all') {
    activeFilterText.textContent = 'All Invoices';
    btnClearFilter.classList.add('hidden');
    return;
  }

  btnClearFilter.classList.remove('hidden');

  if (state.activeFilter === 'open') {
    kpiOpenCard.classList.add('active-selection');
    activeFilterText.textContent = 'All Open Invoices (Balance > 0)';
  } else if (state.activeFilter === 'overdue') {
    kpiOverdueCard.classList.add('active-selection');
    activeFilterText.textContent = 'Total Overdue Invoices';
  } else if (state.activeFilter === 'current') {
    kpiCurrentCard.classList.add('active-selection');
    activeFilterText.textContent = 'Current / Due Today';
  } else {
    const card = document.getElementById(`bucket-${state.activeFilter}`);
    if (card) card.classList.add('active-selection');
    const bucketInfo = state.metricsData?.aging_buckets[state.activeFilter];
    activeFilterText.textContent = bucketInfo ? bucketInfo.label : state.activeFilter;
  }
}

/**
 * Renders Filtered Contributing Source Invoices Table.
 */
function renderInvoicesTable() {
  if (!state.metricsData) return;

  let list = state.metricsData.invoices || [];

  if (state.activeFilter === 'open') {
    list = list.filter((inv) => inv.balance_cents > 0);
  } else if (state.activeFilter === 'overdue') {
    list = list.filter((inv) => inv.is_overdue);
  } else if (state.activeFilter === 'current') {
    list = list.filter((inv) => inv.balance_cents > 0 && !inv.is_overdue);
  } else if (bucketKeys.includes(state.activeFilter)) {
    list = list.filter((inv) => inv.balance_cents > 0 && inv.bucket === state.activeFilter);
  }

  tableSummaryCount.textContent = `${list.length} invoice${list.length === 1 ? '' : 's'} matching`;

  if (list.length === 0) {
    invoicesTableBody.innerHTML = `
      <tr>
        <td colspan="10" class="text-center text-muted" style="padding: 32px 16px;">
          No invoices match the selected filter criteria.
        </td>
      </tr>
    `;
    return;
  }

  invoicesTableBody.innerHTML = '';
  list.forEach((inv) => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.title = 'Click to inspect raw source record';
    tr.addEventListener('click', () => openInvoiceModal(inv));

    const statusBadgeClass = `badge-status status-${inv.status}`;
    const daysBadgeClass = inv.days_overdue > 0 ? 'badge-overdue-days days-overdue' : 'badge-overdue-days days-current';
    const daysDisplay = inv.days_overdue > 0 ? `+${inv.days_overdue} d` : `${inv.days_overdue} d`;

    tr.innerHTML = `
      <td class="font-mono" style="font-weight: 600; color: #60a5fa;">${escapeHtml(inv.invoice_id)}</td>
      <td class="font-mono text-muted">${escapeHtml(inv.customer_id)}</td>
      <td style="font-weight: 500;">${escapeHtml(inv.customer_name)}</td>
      <td class="font-mono">${escapeHtml(inv.date)}</td>
      <td class="font-mono">${escapeHtml(inv.due_date)}</td>
      <td><span class="${statusBadgeClass}">${escapeHtml(inv.status)}</span></td>
      <td class="text-right font-mono">${escapeHtml(inv.formatted_total)}</td>
      <td class="text-right font-mono" style="font-weight: 600;">${escapeHtml(inv.formatted_balance)}</td>
      <td class="text-center"><span class="${daysBadgeClass}">${daysDisplay}</span></td>
      <td><span class="font-mono text-muted">${escapeHtml(inv.bucket_label)}</span></td>
    `;
    invoicesTableBody.appendChild(tr);
  });
}

/**
 * Renders Quarantined Ingestion Exceptions.
 */
function renderExceptions(exceptions) {
  exceptionsBadge.textContent = `${exceptions.length} Flagged`;

  if (exceptions.length === 0) {
    exceptionsTableBody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-muted" style="padding: 24px 16px;">
          No validation exceptions detected. All incoming records passed integrity checks.
        </td>
      </tr>
    `;
    return;
  }

  exceptionsTableBody.innerHTML = '';
  exceptions.forEach((exc) => {
    const tr = document.createElement('tr');
    const reasonsHtml = exc.reasons
      .map((r) => `<div class="reason-tag">⚠️ ${escapeHtml(r)}</div>`)
      .join('');

    const rawStr = JSON.stringify(exc.raw_record);

    tr.innerHTML = `
      <td class="font-mono text-muted">#${exc.index + 1}</td>
      <td class="font-mono" style="color: #f87171;">${escapeHtml(exc.invoice_id || 'N/A (Missing)')}</td>
      <td>${reasonsHtml}</td>
      <td><code class="raw-preview" title="${escapeHtml(rawStr)}">${escapeHtml(rawStr)}</code></td>
    `;
    exceptionsTableBody.appendChild(tr);
  });
}

/**
 * Opens Invoice Detail Modal with Audit Trail.
 */
function openInvoiceModal(inv) {
  modalTitle.textContent = `Invoice Audit: ${inv.invoice_id}`;
  modalBody.innerHTML = `
    <div class="modal-key-val">
      <span class="text-muted">Source Invoice ID:</span>
      <strong class="font-mono">${escapeHtml(inv.invoice_id)}</strong>
    </div>
    <div class="modal-key-val">
      <span class="text-muted">Customer Name:</span>
      <span>${escapeHtml(inv.customer_name)}</span>
    </div>
    <div class="modal-key-val">
      <span class="text-muted">Customer ID:</span>
      <span class="font-mono">${escapeHtml(inv.customer_id)}</span>
    </div>
    <div class="modal-key-val">
      <span class="text-muted">Currency:</span>
      <span class="font-mono">${escapeHtml(inv.currency)}</span>
    </div>
    <div class="modal-key-val">
      <span class="text-muted">Issue Date:</span>
      <span class="font-mono">${escapeHtml(inv.date)}</span>
    </div>
    <div class="modal-key-val">
      <span class="text-muted">Due Date:</span>
      <span class="font-mono">${escapeHtml(inv.due_date)}</span>
    </div>
    <div class="modal-key-val">
      <span class="text-muted">Report As-Of Date:</span>
      <span class="font-mono">${escapeHtml(state.reportDate)}</span>
    </div>
    <div class="modal-key-val">
      <span class="text-muted">Days Overdue:</span>
      <strong class="font-mono">${inv.days_overdue} days</strong>
    </div>
    <div class="modal-key-val">
      <span class="text-muted">Aging Bucket:</span>
      <span class="font-mono">${escapeHtml(inv.bucket_label)}</span>
    </div>
    <div class="modal-key-val">
      <span class="text-muted">Total Amount:</span>
      <span class="font-mono">${escapeHtml(inv.formatted_total)}</span>
    </div>
    <div class="modal-key-val">
      <span class="text-muted">Outstanding Balance:</span>
      <strong class="font-mono" style="color: #60a5fa;">${escapeHtml(inv.formatted_balance)}</strong>
    </div>
    <div class="modal-key-val">
      <span class="text-muted">Status:</span>
      <span class="badge-status status-${inv.status}">${escapeHtml(inv.status)}</span>
    </div>
  `;
  invoiceModal.classList.remove('hidden');
}

function closeModal() {
  invoiceModal.classList.add('hidden');
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Filter click handler.
 */
function setFilter(filterKey) {
  if (state.activeFilter === filterKey) {
    state.activeFilter = null; // toggle off
  } else {
    state.activeFilter = filterKey;
  }
  updateFilterHighlights();
  renderInvoicesTable();
}

// Event Listeners
reportDateInput.addEventListener('change', (e) => {
  state.reportDate = e.target.value;
  loadMetrics();
});

currencySelect.addEventListener('change', (e) => {
  state.currency = e.target.value;
  loadMetrics();
});

btnRefresh.addEventListener('click', () => triggerRefresh(false));
btnSimulateFail.addEventListener('click', () => triggerRefresh(true));

kpiOpenCard.addEventListener('click', () => setFilter('open'));
kpiOverdueCard.addEventListener('click', () => setFilter('overdue'));
kpiCurrentCard.addEventListener('click', () => setFilter('current'));

bucketKeys.forEach((key) => {
  const el = document.getElementById(`bucket-${key}`);
  if (el) el.addEventListener('click', () => setFilter(key));
});

btnClearFilter.addEventListener('click', () => setFilter(null));

modalCloseBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Initialize on DOM ready
async function init() {
  await loadStatus();
  await Promise.all([loadMetrics(), loadExceptions()]);
}

init();
