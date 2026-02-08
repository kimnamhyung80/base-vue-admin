import { ref, computed, watch, type Ref } from 'vue'
import type { PaginationParams, PaginatedResponse } from '@/types'

interface UsePaginationOptions<T> {
  fetchFn: (params: PaginationParams) => Promise<PaginatedResponse<T>>
  initialPage?: number
  initialPageSize?: number
  immediate?: boolean
}

export function usePagination<T>(options: UsePaginationOptions<T>) {
  const { fetchFn, initialPage = 1, initialPageSize = 10, immediate = true } = options

  const items = ref<T[]>([]) as Ref<T[]>
  const total = ref(0)
  const page = ref(initialPage)
  const pageSize = ref(initialPageSize)
  const sortBy = ref<string>()
  const sortOrder = ref<'asc' | 'desc'>('asc')
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))
  const hasNextPage = computed(() => page.value < totalPages.value)
  const hasPrevPage = computed(() => page.value > 1)

  const paginationParams = computed(() => ({
    page: page.value,
    pageSize: pageSize.value,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value,
  }) as PaginationParams)

  async function fetchData(): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetchFn(paginationParams.value)
      items.value = response.items
      total.value = response.total
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      isLoading.value = false
    }
  }

  function goToPage(newPage: number): void {
    if (newPage >= 1 && newPage <= totalPages.value) {
      page.value = newPage
    }
  }

  function nextPage(): void {
    if (hasNextPage.value) {
      page.value++
    }
  }

  function prevPage(): void {
    if (hasPrevPage.value) {
      page.value--
    }
  }

  function setPageSize(size: number): void {
    pageSize.value = size
    page.value = 1 // Reset to first page
  }

  function setSort(field: string, order: 'asc' | 'desc' = 'asc'): void {
    sortBy.value = field
    sortOrder.value = order
  }

  function refresh(): void {
    fetchData()
  }

  // Auto-fetch when pagination params change
  watch([page, pageSize, sortBy, sortOrder], () => {
    fetchData()
  })

  // Initial fetch
  if (immediate) {
    fetchData()
  }

  return {
    // State
    items,
    total,
    page,
    pageSize,
    sortBy,
    sortOrder,
    isLoading,
    error,

    // Computed
    totalPages,
    hasNextPage,
    hasPrevPage,
    paginationParams,

    // Methods
    fetchData,
    goToPage,
    nextPage,
    prevPage,
    setPageSize,
    setSort,
    refresh,
  }
}
