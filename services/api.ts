import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"

const AUTH_TOKEN_KEY = 'authToken'; // Key for localStorage

// Token state - initialize from localStorage if available
let currentAccessToken: string | null = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_KEY) : null;

export const getAuthToken = (): string | null => {
    // Ensure in-memory state is synced with localStorage on read
    if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
        if (storedToken !== currentAccessToken) {
            currentAccessToken = storedToken; // Sync if different
        }
    }
    return currentAccessToken;
};

export const setAuthToken = (token: string | null) => {
    currentAccessToken = token;
    if (typeof window !== 'undefined') {
        if (token) {
            localStorage.setItem(AUTH_TOKEN_KEY, token);
            console.log("Auth token saved to localStorage.");
        } else {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            console.log("Auth token removed from localStorage.");
        }
    }
};

export const clearAuthToken = () => {
    setAuthToken(null); // Use setAuthToken(null) to handle both memory and localStorage
};

// Refresh logic variables
let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; config: InternalAxiosRequestConfig }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      if (token && prom.config.headers) {
         prom.config.headers['Authorization'] = 'Bearer ' + token;
      }
      // Retry the original request using the 'api' instance itself
      api(prom.config).then(prom.resolve).catch(prom.reject);
    }
  });
  failedQueue = [];
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies (like refresh_token)
})

// Request Interceptor: Add Authorization header
api.interceptors.request.use(
  (config) => {
    // Use getAuthToken() which now reads from localStorage initially
    const token = getAuthToken();
    if (token && config.headers && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor for refresh logic
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Check if it's a 401 error, not a retry, and not the refresh endpoint itself
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry && !originalRequest.url?.endsWith('/auth/refresh')) {

      if (isRefreshing) {
        // Queue request if refresh is already in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("Axios Interceptor: Access token expired/invalid. Attempting refresh...");
        // Use the instance itself for refresh call to ensure baseURL and withCredentials are used
        const refreshResponse = await api.post('/auth/refresh', {});

        // Expect 'auth_token' from the refresh response now
        const newAuthToken = refreshResponse.data?.auth_token;

        if (newAuthToken) {
          console.log("Axios Interceptor: Token refreshed successfully.");
          setAuthToken(newAuthToken); // Update the stored token (now includes localStorage)

          // Update the header for the original request
          if (originalRequest.headers) {
             originalRequest.headers['Authorization'] = 'Bearer ' + newAuthToken;
          }

          processQueue(null, newAuthToken); // Process queued requests
          return api(originalRequest); // Retry original request
        } else {
           // Refresh endpoint didn't return a token
           console.error("Axios Interceptor: Refresh endpoint did not return auth_token.");
           clearAuthToken(); // Clear invalid state
           processQueue(new Error("Refresh failed: No new token received"), null);
           return Promise.reject(error); // Reject with the original 401 error
        }
      } catch (refreshError: any) {
        console.error("Axios Interceptor: Failed to refresh token:", refreshError?.response?.data || refreshError.message);
        clearAuthToken(); // Clear potentially invalid state
        processQueue(refreshError, null);
        // Reject with the refresh error itself, as it's more informative than the original 401
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error); // Reject other errors
  },
)

export { api }
