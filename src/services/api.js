import axios from 'axios';

/**
 * Industry-standard Axios instance configuration.
 * Centralizing the base URL and common headers.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

/**
 * Request Interceptor
 * Useful for adding authentication tokens automatically.
 */
api.interceptors.request.use(
  (config) => {
    // Example: Add Auth Token if available
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * Centralized error handling and data extraction.
 */
api.interceptors.response.use(
  (response) => response.data, // Automatically return data instead of the full response object
  (error) => {
    // Global error handling logic (e.g., redirect to login on 401)
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    console.error('API Error:', message);
    return Promise.reject({ ...error, message });
  }
);

export default api;
