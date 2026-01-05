import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Axios base configuration
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://rickandmortyapi.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add token if it exists
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can add authentication token here
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - centralized error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Common error handling
    if (error.response) {
      const status = error.response.status;
      
      switch (status) {
        case 401:
          // Token expired or unauthorized
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
          break;
        case 403:
          console.error('No tienes permisos para acceder a este recurso');
          break;
        case 404:
          console.error('Recurso no encontrado');
          break;
        case 500:
          console.error('Error interno del servidor');
          break;
        default:
          console.error('Error en la petición:', error.message);
      }
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor');
    } else {
      console.error('Error al configurar la petición:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
