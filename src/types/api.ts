// API Response Types
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
  timestamp: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiError {
  code: number
  message: string
  details?: Record<string, unknown>
}

// Pagination Request
export interface PaginationParams {
  page: number
  pageSize: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Common Entity Types
export interface BaseEntity {
  id: string | number
  createdAt: string
  updatedAt: string
}
