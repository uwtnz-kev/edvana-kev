export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  category?: string;
  level?: string;
  subject?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
}

export interface UploadResponse {
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
  url: string;
}

// Generic API hook return type
export interface ApiHookResult<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Mutation hook return type
export interface MutationHookResult<TData, TVariables> {
  mutate: (variables: TVariables) => Promise<TData>;
  isLoading: boolean;
  error: Error | null;
  reset: () => void;
}