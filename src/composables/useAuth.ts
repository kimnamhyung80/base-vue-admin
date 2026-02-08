import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { LoginRequest, RegisterRequest } from '@/types'

export function useAuth() {
  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.currentUser)

  async function login(credentials: LoginRequest): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      await authStore.login(credentials)
      
      // Redirect to intended page or dashboard
      const redirect = (route.query['redirect'] as string) || '/dashboard'
      await router.push(redirect)
      
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : '로그인에 실패했습니다.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function register(credentials: RegisterRequest): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      // TODO: Implement registration logic with credentials
      console.log('Registering:', credentials.email)
      await router.push('/auth/login')
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : '회원가입에 실패했습니다.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function logout(): Promise<void> {
    await authStore.logout()
    await router.push('/auth/login')
  }

  function hasPermission(permissions: string | string[]): boolean {
    const perms = Array.isArray(permissions) ? permissions : [permissions]
    return authStore.hasPermission(perms)
  }

  function hasRole(roles: string | string[]): boolean {
    const roleList = Array.isArray(roles) ? roles : [roles]
    return authStore.hasRole(roleList)
  }

  return {
    // State
    isLoading,
    error,
    isAuthenticated,
    user,

    // Actions
    login,
    register,
    logout,

    // Permission checks
    hasPermission,
    hasRole,
  }
}
