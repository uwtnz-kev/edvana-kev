import axios from 'axios';
import { getStoredToken, clearAuthData } from '@/utils/auth/authStorage';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginPage = window.location.pathname === "/login";
    if (error.response?.status === 401 && !isLoginPage) {
      clearAuthData();
      window.location.href = `${import.meta.env.BASE_URL}login`;

    }
    return Promise.reject(error);
  }
);

export default api;
