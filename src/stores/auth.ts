import { defineStore } from 'pinia'
import type { User, LoginRequest, LoginResponse } from '@/types'
import { authApi } from '@/api/auth'
import { storage } from '@/utils/storage'

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isLoading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: storage.get<string>(import.meta.env.VITE_AUTH_TOKEN_KEY) ?? null,
    refreshToken: storage.get<string>(import.meta.env.VITE_AUTH_REFRESH_TOKEN_KEY) ?? null,
    isLoading: false,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.token && !!state.user,
    
    currentUser: (state): User | null => state.user,
    
    userRole: (state): string | null => state.user?.role ?? null,
    
    userPermissions: (state): string[] => state.user?.permissions ?? [],
  },

  actions: {
    async login(credentials: LoginRequest): Promise<void> {
      this.isLoading = true
      try {
        const response: LoginResponse = await authApi.login(credentials)
        this.setAuth(response)
      } finally {
        this.isLoading = false
      }
    },

    async logout(): Promise<void> {
      try {
        await authApi.logout()
      } finally {
        this.clearAuth()
      }
    },

    async refreshAccessToken(): Promise<void> {
      if (!this.refreshToken) {
        this.clearAuth()
        throw new Error('No refresh token available')
      }

      try {
        const response = await authApi.refreshToken(this.refreshToken)
        this.token = response.accessToken
        this.refreshToken = response.refreshToken
        storage.set(import.meta.env.VITE_AUTH_TOKEN_KEY, response.accessToken)
        storage.set(import.meta.env.VITE_AUTH_REFRESH_TOKEN_KEY, response.refreshToken)
      } catch {
        this.clearAuth()
        throw new Error('Token refresh failed')
      }
    },

    async fetchUserProfile(): Promise<void> {
      if (!this.token) return
      
      this.isLoading = true
      try {
        this.user = await authApi.getProfile()
      } finally {
        this.isLoading = false
      }
    },

    setAuth(response: LoginResponse): void {
      this.user = response.user
      this.token = response.accessToken
      this.refreshToken = response.refreshToken
      storage.set(import.meta.env.VITE_AUTH_TOKEN_KEY, response.accessToken)
      storage.set(import.meta.env.VITE_AUTH_REFRESH_TOKEN_KEY, response.refreshToken)
    },

    clearAuth(): void {
      this.user = null
      this.token = null
      this.refreshToken = null
      storage.remove(import.meta.env.VITE_AUTH_TOKEN_KEY)
      storage.remove(import.meta.env.VITE_AUTH_REFRESH_TOKEN_KEY)
    },

    hasPermission(permissions: string[]): boolean {
      if (!this.user) return false
      return permissions.some((p) => this.userPermissions.includes(p))
    },

    hasRole(roles: string[]): boolean {
      if (!this.user) return false
      return roles.includes(this.user.role)
    },
  },
})
