import axios, { AxiosError, AxiosResponse } from 'axios';
import { getStoredToken, setStoredToken, clearAuthData } from '@/utils/auth/authStorage';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 30000, // Reduced for better UX
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with token refresh
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: AxiosError, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    const isLoginPage = window.location.pathname === '/login';

    if (error.response?.status === 401 && !originalRequest._retry && !isLoginPage) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return api(originalRequest);
            }
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh token call
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        
        const newToken = refreshResponse.data.token;
        setStoredToken(newToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError: any) {
        clearAuthData();
        window.location.href = '/login?session_expired=true';
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other errors
    if (!isLoginPage) {
      console.error('API Error:', error.response?.data || error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
