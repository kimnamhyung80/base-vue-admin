import { http } from './http'
import type { User, PaginatedResponse, PaginationParams } from '@/types'

const BASE_URL = '/users'

export const userApi = {
  getList(params: PaginationParams & { search?: string; role?: string }): Promise<PaginatedResponse<User>> {
    return http.get<PaginatedResponse<User>>(BASE_URL, { params })
  },

  getById(id: string): Promise<User> {
    return http.get<User>(`${BASE_URL}/${id}`)
  },

  create(data: Partial<User>): Promise<User> {
    return http.post<User>(BASE_URL, data)
  },

  update(id: string, data: Partial<User>): Promise<User> {
    return http.patch<User>(`${BASE_URL}/${id}`, data)
  },

  delete(id: string): Promise<void> {
    return http.delete(`${BASE_URL}/${id}`).then(() => undefined)
  },

  batchDelete(ids: string[]): Promise<void> {
    return http.post(`${BASE_URL}/batch-delete`, { ids }).then(() => undefined)
  },

  updateStatus(id: string, status: User['status']): Promise<User> {
    return http.patch<User>(`${BASE_URL}/${id}/status`, { status })
  },
}
