/**
 * Types related to authentication and users
 */

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  documentTypeId?: number | null;
  documentTypeAbbr?: string | null;
  documentTypeName?: string | null;
  documentNumber?: string | null;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  documentTypeId?: number;
  documentNumber?: string;
}

export interface DocumentType {
  id: number;
  name: string;
  abbreviation: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  document_type_name: string | null;
  document_type_abbr: string | null;
  document_type_id: number | null;
  document_number: string | null;
  created_at: string;
  updated_at: string;
}
