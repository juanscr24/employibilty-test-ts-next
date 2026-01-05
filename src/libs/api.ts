import axiosInstance from './axios';
import { CharactersResponse, Character } from '@/types';

/**
 * Service to interact with the Rick and Morty API
 */

export const characterService = {
  /**
   * Get all characters
   */
  getAll: async (): Promise<Character[]> => {
    const response = await axiosInstance.get<CharactersResponse>('/character');
    return response.data.results;
  },

  /**
   * Get a character by ID
   */
  getById: async (id: number): Promise<Character> => {
    const response = await axiosInstance.get<Character>(`/character/${id}`);
    return response.data;
  },

  /**
   * Search characters with filters
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
 * Authentication service (simulated - adapt to your backend)
 */
export const authService = {
  /**
   * User login
   */
  login: async (email: string, password: string) => {
    // Simulation - replace with real endpoint
    return axiosInstance.post('/auth/login', { email, password });
  },

  /**
   * User registration
   */
  register: async (name: string, email: string, password: string) => {
    // Simulation - replace with real endpoint
    return axiosInstance.post('/auth/register', { name, email, password });
  },

  /**
   * User logout
   */
  logout: async () => {
    // Simulation - replace with real endpoint
    return axiosInstance.post('/auth/logout');
  },
};
