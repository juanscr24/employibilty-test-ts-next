import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Rick & Morty public API client (no auth)
const axiosInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Local API client (Next.js API routes) - includes JWT auth
export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
