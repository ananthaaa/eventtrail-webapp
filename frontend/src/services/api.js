/**
 * EventTrail (CampusPulse) — Frontend API Service Wrapper
 * Handles HTTP communications with API Gateway / Lambda endpoints.
 * Automatically attaches Cognito JWT Authorization Bearer tokens.
 */

const BASE_URL = '/api';

/**
 * Retrieve current JWT token from storage.
 */
function getAuthToken() {
  return localStorage.getItem('eventtrail_jwt_token') || null;
}

/**
 * Core fetch wrapper handling authorization headers and JSON serialization.
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const errorObj = new Error(data.error || `HTTP error! status: ${response.status}`);
      errorObj.status = response.status;
      errorObj.code = data.code || 'HTTP_ERROR';
      errorObj.payload = data;
      throw errorObj;
    }

    return data;
  } catch (err) {
    console.error(`[API Request Error] ${options.method || 'GET'} ${url}:`, err.message);
    throw err;
  }
}

export const api = {
  get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
};
