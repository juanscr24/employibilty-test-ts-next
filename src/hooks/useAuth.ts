import { useState, useCallback } from 'react';
import axiosInstance from '@/libs/axios';
import { User, AuthResponse } from '@/types';

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulación de login - reemplazar con tu endpoint real
      const response = await axiosInstance.post<AuthResponse>('/auth/login', {
        email,
        password,
      });

      const { user: userData, token } = response.data;

      // Guardar token en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulación de registro - reemplazar con tu endpoint real
        const response = await axiosInstance.post<AuthResponse>('/auth/register', {
          name,
          email,
          password,
        });

        const { user: userData, token } = response.data;

        // Guardar token en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Error al registrarse';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
};
