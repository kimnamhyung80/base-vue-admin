// User Types
export interface User {
  id: string
  email: string
  username: string
  displayName: string
  avatar?: string
  role: UserRole
  permissions: string[]
  status: UserStatus
  createdAt: string
  updatedAt: string
}

export type UserRole = 'admin' | 'manager' | 'user' | 'guest'

export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended'

// Auth Types
export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  user: User
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface RegisterRequest {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export interface TokenPayload {
  sub: string
  email: string
  role: UserRole
  exp: number
  iat: number
}
