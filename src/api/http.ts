import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore()
    
    // Add auth token
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error) => {
    const authStore = useAuthStore()
    const appStore = useAppStore()
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    // Handle 401 - Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        await authStore.refreshAccessToken()
        return axiosInstance(originalRequest)
      } catch {
        authStore.clearAuth()
        window.location.href = '/auth/login'
        return Promise.reject(error)
      }
    }

    // Handle other errors
    const errorMessage = error.response?.data?.message || error.message || '요청 처리 중 오류가 발생했습니다.'
    
    // You can show a global toast/notification here
    console.error('[API Error]', errorMessage)
    
    appStore.setLoading(false)
    
    return Promise.reject(error)
  }
)

// HTTP methods wrapper - 직접 응답 데이터 반환
export const http = {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.get(url, config).then((res) => res.data as T)
  },

  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.post(url, data, config).then((res) => res.data as T)
  },

  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.put(url, data, config).then((res) => res.data as T)
  },

  patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.patch(url, data, config).then((res) => res.data as T)
  },

  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.delete(url, config).then((res) => res.data as T)
  },
}

export default axiosInstance
