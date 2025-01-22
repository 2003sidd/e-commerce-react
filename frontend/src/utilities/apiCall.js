import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:8800/route/api', // Replace with your API's base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor (optional)
apiClient.interceptors.request.use(
  (config) => {

    console.log("request ", config)
    // Modify the request config if needed (e.g., add auth tokens)
    const token = localStorage.getItem('authToken'); // Example: Get token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
apiClient.interceptors.response.use(
  (response) => {
    console.log("response ", response)

    // Process and return the response data
    return response.data;
  },
  (error) => {
    // Handle response errors
    console.error('API call failed:', error.response || error.message);
    return Promise.reject(error);
  }
);

// Utility functions for API calls
const api = {
  get: (url, params) => apiClient.get(url, { params }),
  post: (url, data) => apiClient.post(url, data),
  put: (url, data) => apiClient.put(url, data),
  delete: (url) => apiClient.delete(url),
};

export default api;
