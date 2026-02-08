/**
 * Storage utility for localStorage/sessionStorage with type safety
 */

type StorageType = 'local' | 'session'

function getStorageInstance(type: StorageType): Storage {
  return type === 'local' ? window.localStorage : window.sessionStorage
}

export const storage = {
  /**
   * Get item from storage
   */
  get<T>(key: string, type: StorageType = 'local'): T | null {
    try {
      const item = getStorageInstance(type).getItem(key)
      if (item === null) return null
      return JSON.parse(item) as T
    } catch {
      return null
    }
  },

  /**
   * Set item in storage
   */
  set<T>(key: string, value: T, type: StorageType = 'local'): void {
    try {
      getStorageInstance(type).setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Failed to set storage key "${key}":`, error)
    }
  },

  /**
   * Remove item from storage
   */
  remove(key: string, type: StorageType = 'local'): void {
    getStorageInstance(type).removeItem(key)
  },

  /**
   * Clear all items from storage
   */
  clear(type: StorageType = 'local'): void {
    getStorageInstance(type).clear()
  },

  /**
   * Check if key exists in storage
   */
  has(key: string, type: StorageType = 'local'): boolean {
    return getStorageInstance(type).getItem(key) !== null
  },

  /**
   * Get all keys from storage
   */
  keys(type: StorageType = 'local'): string[] {
    const storageInstance = getStorageInstance(type)
    const keys: string[] = []
    for (let i = 0; i < storageInstance.length; i++) {
      const key = storageInstance.key(i)
      if (key) keys.push(key)
    }
    return keys
  },
}

// Session storage shortcuts
export const sessionStorageUtil = {
  get: <T>(key: string) => storage.get<T>(key, 'session'),
  set: <T>(key: string, value: T) => storage.set(key, value, 'session'),
  remove: (key: string) => storage.remove(key, 'session'),
  clear: () => storage.clear('session'),
  has: (key: string) => storage.has(key, 'session'),
  keys: () => storage.keys('session'),
}
