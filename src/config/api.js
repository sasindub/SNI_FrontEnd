/**
 * API Configuration
 * 
 * This file centralizes the API base URL configuration.
 * The URL is read from the REACT_APP_API_URL environment variable.
 * 
 * To configure:
 * 1. Create a .env file in the project root
 * 2. Add: REACT_APP_API_URL=https://snibackend-production.up.railway.app
 * 3. For local development: REACT_APP_API_URL=http://localhost:5000
 * 
 * Note: After changing .env, restart the development server
 */

// Get API URL from environment variable
// Default to localhost for development, use REACT_APP_API_URL for production
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
export const API_BASE_URL = process.env.REACT_APP_API_URL || (isDevelopment ? 'http://localhost:5000' : 'https://snibackend-production.up.railway.app');

/**
 * Check if we're in cross-origin mode (localhost → Railway)
 */
const isCrossOrigin = () => {
  return window.location.hostname === 'localhost' && 
         API_BASE_URL.includes('railway.app');
};

/**
 * Get auth token from localStorage
 */
export const getAuthToken = () => {
  return localStorage.getItem('admin_token');
};

/**
 * Set auth token in localStorage
 */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('admin_token', token);
  } else {
    localStorage.removeItem('admin_token');
  }
};

/**
 * Fetch wrapper - SIMPLE TOKEN AUTH for admin
 */
export const apiFetch = (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Always add token if we have it
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  const defaultOptions = {
    headers: defaultHeaders,
    ...options
  };

  return fetch(url, defaultOptions);
};

export default API_BASE_URL;

