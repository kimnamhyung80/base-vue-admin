import { ref, watch, type Ref } from 'vue'

interface UseAsyncOptions<T> {
  immediate?: boolean
  initialValue?: T
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

interface UseAsyncReturn<T, P extends unknown[]> {
  data: Ref<T | null>
  isLoading: Ref<boolean>
  error: Ref<Error | null>
  execute: (...args: P) => Promise<T | null>
  reset: () => void
}

export function useAsync<T, P extends unknown[] = []>(
  fn: (...args: P) => Promise<T>,
  options: UseAsyncOptions<T> = {}
): UseAsyncReturn<T, P> {
  const { immediate = false, initialValue = null, onSuccess, onError } = options

  const data = ref<T | null>(initialValue) as Ref<T | null>
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  async function execute(...args: P): Promise<T | null> {
    isLoading.value = true
    error.value = null

    try {
      const result = await fn(...args)
      data.value = result
      onSuccess?.(result)
      return result
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e))
      error.value = err
      onError?.(err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  function reset(): void {
    data.value = initialValue
    isLoading.value = false
    error.value = null
  }

  if (immediate) {
    execute(...([] as unknown as P))
  }

  return {
    data,
    isLoading,
    error,
    execute,
    reset,
  }
}

// Simplified version for data fetching
export function useFetch<T>(
  url: string | Ref<string>,
  options: UseAsyncOptions<T> & { immediate?: boolean } = {}
) {
  const { immediate = true, ...restOptions } = options

  const fetchFn = async () => {
    const finalUrl = typeof url === 'string' ? url : url.value
    const response = await fetch(finalUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json() as Promise<T>
  }

  const result = useAsync(fetchFn, { immediate, ...restOptions })

  // Re-fetch when URL changes
  if (typeof url !== 'string') {
    watch(url, () => {
      result.execute()
    })
  }

  return result
}
