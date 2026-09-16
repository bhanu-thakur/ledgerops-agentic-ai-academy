/**
 * Zoho Books API Client
 * Handles OAuth token lifecycle, regional domains, paginated invoice fetching,
 * and mapping live Zoho Books payloads to the dashboard canonical schema.
 * Reference: docs/03-zoho-dashboard-blueprint.md
 */

export class ZohoBooksClient {
  /**
   * @param {object} config
   * @param {string} config.clientId - OAuth Client ID from api-console.zoho.com
   * @param {string} config.clientSecret - OAuth Client Secret
   * @param {string} [config.refreshToken] - Permanent Refresh Token
   * @param {string} [config.code] - One-time grant code (if exchanging for refresh token)
   * @param {string} [config.organizationId] - Zoho Books Organization ID
   * @param {string} [config.region='in'] - Zoho regional domain ('in', 'com', 'eu', 'com.au')
   */
  constructor(config = {}) {
    this.clientId = config.clientId || process.env.ZOHO_CLIENT_ID;
    this.clientSecret = config.clientSecret || process.env.ZOHO_CLIENT_SECRET;
    this.refreshToken = config.refreshToken || process.env.ZOHO_REFRESH_TOKEN;
    this.organizationId = config.organizationId || process.env.ZOHO_ORG_ID;
    this.region = (config.region || process.env.ZOHO_REGION || 'in').toLowerCase();

    this.accountsDomain = `https://accounts.zoho.${this.region === 'us' ? 'com' : this.region}`;
    this.apiDomain = `https://www.zohoapis.${this.region === 'us' ? 'com' : this.region}`;

    this.accessToken = null;
    this.tokenExpiresAt = 0;
  }

  /**
   * Checks whether required credentials for live mode are provided.
   * @returns {boolean}
   */
  isConfigured() {
    return Boolean(this.clientId && this.clientSecret && (this.refreshToken || process.env.ZOHO_CODE));
  }

  /**
   * Exchanges a one-time grant code for permanent refresh_token and initial access_token.
   * @param {string} code
   * @returns {Promise<{ refresh_token: string, access_token: string }>}
   */
  async exchangeCodeForTokens(code) {
    const url = `${this.accountsDomain}/oauth/v2/token`;
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: code,
    });

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await res.json();
    if (data.error) {
      throw new Error(`Zoho OAuth Error: ${data.error} - ${data.error_description || ''}`);
    }

    this.refreshToken = data.refresh_token || this.refreshToken;
    this.accessToken = data.access_token;
    this.tokenExpiresAt = Date.now() + (data.expires_in - 120) * 1000;

    return data;
  }

  /**
   * Obtains a fresh access_token using the stored refresh_token.
   * @returns {Promise<string>}
   */
  async getValidAccessToken() {
    // If token is still valid (with 2-minute safety window), reuse it
    if (this.accessToken && Date.now() < this.tokenExpiresAt) {
      return this.accessToken;
    }

    if (!this.refreshToken) {
      throw new Error('Cannot refresh access token: ZOHO_REFRESH_TOKEN is missing.');
    }

    const url = `${this.accountsDomain}/oauth/v2/token`;
    const params = new URLSearchParams({
      refresh_token: this.refreshToken,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'refresh_token',
    });

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await res.json();
    if (data.error) {
      throw new Error(`Zoho Token Refresh Failed: ${data.error} (${data.error_description || ''})`);
    }

    this.accessToken = data.access_token;
    this.tokenExpiresAt = Date.now() + (data.expires_in - 120) * 1000;
    return this.accessToken;
  }

  /**
   * Discovers the primary Organization ID if not explicitly specified.
   * Calls GET /api/v3/organizations
   * @returns {Promise<string>}
   */
  async fetchPrimaryOrganizationId() {
    if (this.organizationId) return this.organizationId;

    const token = await this.getValidAccessToken();
    const res = await fetch(`${this.apiDomain}/books/v3/organizations`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
    });

    const data = await res.json();
    if (data.code !== 0 || !Array.isArray(data.organizations) || data.organizations.length === 0) {
      throw new Error(`Failed to retrieve Zoho organizations: ${data.message || JSON.stringify(data)}`);
    }

    this.organizationId = data.organizations[0].organization_id;
    return this.organizationId;
  }

  /**
   * Fetches all invoices from Zoho Books with automatic pagination handling.
   * Endpoint: GET /api/v3/invoices
   * @returns {Promise<Array<object>>} Raw invoice records mapped to dashboard schema
   */
  async fetchInvoices() {
    const token = await this.getValidAccessToken();
    const orgId = await this.fetchPrimaryOrganizationId();

    const allInvoices = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const url = `${this.apiDomain}/books/v3/invoices?organization_id=${orgId}&page=${page}&per_page=100`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      });

      if (res.status === 429) {
        throw new Error('Zoho Books API Rate Limit Exceeded (100 req/min). Please try again in 1 minute.');
      }

      const data = await res.json();
      if (data.code !== 0) {
        throw new Error(`Zoho Books API error [code ${data.code}]: ${data.message}`);
      }

      const invoices = data.invoices || [];
      allInvoices.push(...invoices);

      hasMore = data.page_context?.has_more_page === true;
      page += 1;

      // Safety limit for local development to prevent infinite loops
      if (page > 50) break;
    }

    // Map raw Zoho Books invoice structure to dashboard canonical schema
    return allInvoices.map((inv) => ({
      invoice_id: inv.invoice_number || inv.invoice_id,
      customer_id: inv.customer_id,
      customer_name: inv.customer_name,
      date: inv.date,
      due_date: inv.due_date,
      status: inv.status,
      currency: inv.currency_code,
      total: inv.total,
      balance: inv.balance,
      raw_source: 'zoho_books_live',
    }));
  }
}
