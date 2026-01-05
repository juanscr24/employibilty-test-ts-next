/**
 * Common application types
 */

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sortBy?: string;
  order?: 'asc' | 'desc';
}
