import axiosInstance from './axios';
import { CharactersResponse, Character } from '@/types';

/**
 * Servicio para interactuar con la API de Rick and Morty
 */

export const characterService = {
  /**
   * Obtener todos los personajes
   */
  getAll: async (): Promise<Character[]> => {
    const response = await axiosInstance.get<CharactersResponse>('/character');
    return response.data.results;
  },

  /**
   * Obtener un personaje por ID
   */
  getById: async (id: number): Promise<Character> => {
    const response = await axiosInstance.get<Character>(`/character/${id}`);
    return response.data;
  },

  /**
   * Buscar personajes con filtros
   */
  search: async (params: {
    name?: string;
    status?: string;
    species?: string;
    type?: string;
    gender?: string;
  }): Promise<Character[]> => {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    const response = await axiosInstance.get<CharactersResponse>(
      `/character?${queryParams.toString()}`
    );
    
    return response.data.results;
  },
};

/**
 * Servicio de autenticación (simulado - adaptar a tu backend)
 */
export const authService = {
  /**
   * Login de usuario
   */
  login: async (email: string, password: string) => {
    // Simulación - reemplazar con endpoint real
    return axiosInstance.post('/auth/login', { email, password });
  },

  /**
   * Registro de usuario
   */
  register: async (name: string, email: string, password: string) => {
    // Simulación - reemplazar con endpoint real
    return axiosInstance.post('/auth/register', { name, email, password });
  },

  /**
   * Logout de usuario
   */
  logout: async () => {
    // Simulación - reemplazar con endpoint real
    return axiosInstance.post('/auth/logout');
  },
};
