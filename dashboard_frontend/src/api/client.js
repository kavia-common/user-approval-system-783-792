const DEFAULT_TOKEN_KEY = process.env.REACT_APP_AUTH_TOKEN_KEY || 'auth_token';
// Base URL is taken from REACT_APP_API_BASE_URL in .env at build time.

/**
 * Simple API client wrapping fetch with:
 * - base URL from env (REACT_APP_API_BASE_URL)
 * - JSON body/response handling
 * - JWT auth via localStorage
 * - Basic error normalization
 */
class ApiClient {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_BASE_URL || '';
    if (!this.baseURL) {
      // eslint-disable-next-line no-console
      console.warn('REACT_APP_API_BASE_URL is not set. API calls will likely fail.');
    }
    this.tokenKey = DEFAULT_TOKEN_KEY;
  }

  // PUBLIC_INTERFACE
  /**
   * Set the auth token in localStorage.
   * @param {string} token JWT string
   */
  setToken(token) {
    /** Stores JWT token in localStorage. */
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Get the auth token from localStorage.
   * @returns {string|null}
   */
  getToken() {
    /** Retrieves JWT token from localStorage. */
    return localStorage.getItem(this.tokenKey);
  }

  // PUBLIC_INTERFACE
  /**
   * Clears the stored auth token.
   */
  clearToken() {
    /** Removes JWT token from localStorage. */
    localStorage.removeItem(this.tokenKey);
  }

  // Build headers with optional auth
  _headers(extraHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...extraHeaders,
    };
    const token = this.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }

  async _handleResponse(res) {
    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);
    if (!res.ok) {
      const message =
        (isJson && data && (data.detail || data.message)) ||
        res.statusText ||
        'Request failed';
      const error = new Error(message);
      error.status = res.status;
      error.data = data;
      throw error;
    }
    return data;
  }

  async request(path, options = {}) {
    const url = `${this.baseURL}${path}`;
    const res = await fetch(url, {
      ...options,
      headers: this._headers(options.headers || {}),
    });
    return this._handleResponse(res);
  }

  // PUBLIC_INTERFACE
  /**
   * Perform a GET request.
   * @param {string} path API path, starting with /
   * @param {object} [params] Optional query params object
   */
  get(path, params) {
    /** Performs an authenticated GET. */
    let query = '';
    if (params && typeof params === 'object') {
      const usp = new URLSearchParams(params);
      query = `?${usp.toString()}`;
    }
    return this.request(`${path}${query}`, { method: 'GET' });
  }

  // PUBLIC_INTERFACE
  /**
   * Perform a POST request.
   * @param {string} path
   * @param {object} body
   */
  post(path, body) {
    /** Performs an authenticated POST. */
    return this.request(path, { method: 'POST', body: JSON.stringify(body || {}) });
  }

  // PUBLIC_INTERFACE
  /**
   * Perform a PUT request.
   * @param {string} path
   * @param {object} body
   */
  put(path, body) {
    /** Performs an authenticated PUT. */
    return this.request(path, { method: 'PUT', body: JSON.stringify(body || {}) });
  }

  // PUBLIC_INTERFACE
  /**
   * Perform a DELETE request.
   * @param {string} path
   */
  delete(path) {
    /** Performs an authenticated DELETE. */
    return this.request(path, { method: 'DELETE' });
  }

  // Convenience endpoints (assuming typical REST names on backend)
  // PUBLIC_INTERFACE
  async login(credentials) {
    /** Calls /auth/login to obtain JWT token. */
    const data = await this.post('/auth/login', credentials);
    if (data && data.access_token) {
      this.setToken(data.access_token);
    }
    return data;
  }

  // PUBLIC_INTERFACE
  async signup(payload) {
    /** Calls /auth/signup to create a user account. */
    return this.post('/auth/signup', payload);
  }

  // PUBLIC_INTERFACE
  async me() {
    /** Calls /users/me to fetch current user. */
    return this.get('/users/me');
  }

  // PUBLIC_INTERFACE
  async updateMe(payload) {
    /** Calls /users/me to update current user profile. */
    return this.put('/users/me', payload);
  }

  // PUBLIC_INTERFACE
  async getDashboardAnalytics() {
    /** Calls /analytics/overview for posts/followers/engagement metrics. */
    return this.get('/analytics/overview');
  }

  // PUBLIC_INTERFACE
  async getAdminUsers(params) {
    /** Calls /admin/users with optional query params. */
    return this.get('/admin/users', params);
  }

  // PUBLIC_INTERFACE
  async getAdminPlatformStats() {
    /** Calls /admin/analytics for platform wide analytics. */
    return this.get('/admin/analytics');
  }
}

const api = new ApiClient();
export default api;
