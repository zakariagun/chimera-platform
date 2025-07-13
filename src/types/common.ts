// أنواع عامة مشتركة في جميع أنحاء التطبيق
// Common types shared across the application

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface User extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
  isActive: boolean;
}

export interface PromptType extends BaseEntity {
  title: string;
  content: string;
  type: 'video' | 'image' | 'audio';
  category: string;
  tags: string[];
  isPublic: boolean;
  userId: string;
}