/**
 * Constantes globales de la aplicación
 */

// API
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://rickandmortyapi.com/api';
export const API_TIMEOUT = 10000; // 10 segundos

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
} as const;

// Paginación
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// Tiempos de espera
export const DELAYS = {
  TOAST_DURATION: 3000,
  DEBOUNCE_DELAY: 300,
  ANIMATION_DURATION: 200,
} as const;

// Mensajes de la aplicación
export const MESSAGES = {
  ERROR: {
    GENERIC: 'Ha ocurrido un error inesperado',
    NETWORK: 'Error de conexión. Verifica tu internet',
    UNAUTHORIZED: 'No tienes autorización para realizar esta acción',
    NOT_FOUND: 'Recurso no encontrado',
  },
  SUCCESS: {
    LOGIN: '¡Inicio de sesión exitoso!',
    REGISTER: '¡Registro exitoso!',
    LOGOUT: 'Sesión cerrada correctamente',
    UPDATE: 'Actualizado correctamente',
    DELETE: 'Eliminado correctamente',
  },
} as const;

// Estados de personajes
export const CHARACTER_STATUS = {
  ALIVE: 'Alive',
  DEAD: 'Dead',
  UNKNOWN: 'unknown',
} as const;

// Géneros de personajes
export const CHARACTER_GENDER = {
  FEMALE: 'Female',
  MALE: 'Male',
  GENDERLESS: 'Genderless',
  UNKNOWN: 'unknown',
} as const;

