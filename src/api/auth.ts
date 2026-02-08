import { http } from './http'
import type { User, LoginRequest, LoginResponse, RegisterRequest } from '@/types'

const BASE_URL = '/auth'

export const authApi = {
  login(data: LoginRequest): Promise<LoginResponse> {
    return http.post<LoginResponse>(`${BASE_URL}/login`, data)
  },

  register(data: RegisterRequest): Promise<User> {
    return http.post<User>(`${BASE_URL}/register`, data)
  },

  logout(): Promise<void> {
    return http.post(`${BASE_URL}/logout`).then(() => undefined)
  },

  refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    return http.post<{ accessToken: string; refreshToken: string }>(`${BASE_URL}/refresh`, { refreshToken })
  },

  getProfile(): Promise<User> {
    return http.get<User>(`${BASE_URL}/me`)
  },

  updateProfile(data: Partial<User>): Promise<User> {
    return http.patch<User>(`${BASE_URL}/profile`, data)
  },

  changePassword(data: { currentPassword: string; newPassword: string }): Promise<void> {
    return http.post(`${BASE_URL}/change-password`, data).then(() => undefined)
  },

  forgotPassword(email: string): Promise<void> {
    return http.post(`${BASE_URL}/forgot-password`, { email }).then(() => undefined)
  },

  resetPassword(data: { token: string; password: string }): Promise<void> {
    return http.post(`${BASE_URL}/reset-password`, data).then(() => undefined)
  },
}
