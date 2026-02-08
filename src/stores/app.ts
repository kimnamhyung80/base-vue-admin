import { defineStore } from 'pinia'
import { storage } from '@/utils/storage'

type ThemeMode = 'light' | 'dark' | 'system'
type Language = 'ko' | 'en' | 'ja' | 'zh'

interface AppState {
  // Theme
  theme: ThemeMode
  primaryColor: string
  
  // Sidebar
  sidebarCollapsed: boolean
  sidebarWidth: number
  
  // UI
  isLoading: boolean
  loadingText: string
  
  // Locale
  language: Language
  
  // Device
  isMobile: boolean
  
  // App info
  appVersion: string
  isInitialized: boolean
}

const STORAGE_KEYS = {
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  PRIMARY_COLOR: 'primary_color',
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    theme: storage.get<ThemeMode>(STORAGE_KEYS.THEME) ?? 'system',
    primaryColor: storage.get<string>(STORAGE_KEYS.PRIMARY_COLOR) ?? '#1890ff',
    sidebarCollapsed: storage.get<boolean>(STORAGE_KEYS.SIDEBAR_COLLAPSED) ?? false,
    sidebarWidth: 240,
    isLoading: false,
    loadingText: '',
    language: storage.get<Language>(STORAGE_KEYS.LANGUAGE) ?? 'ko',
    isMobile: false,
    appVersion: import.meta.env.VITE_APP_VERSION ?? '1.0.0',
    isInitialized: false,
  }),

  getters: {
    effectiveTheme: (state): 'light' | 'dark' => {
      if (state.theme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      return state.theme
    },
    
    currentSidebarWidth: (state): number => {
      return state.sidebarCollapsed ? 64 : state.sidebarWidth
    },
  },

  actions: {
    initialize(): void {
      this.detectDevice()
      this.applyTheme()
      window.addEventListener('resize', this.detectDevice.bind(this))
      this.isInitialized = true
    },

    setTheme(theme: ThemeMode): void {
      this.theme = theme
      storage.set(STORAGE_KEYS.THEME, theme)
      this.applyTheme()
    },

    applyTheme(): void {
      const effectiveTheme = this.effectiveTheme
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(effectiveTheme)
      document.documentElement.setAttribute('data-theme', effectiveTheme)
    },

    setPrimaryColor(color: string): void {
      this.primaryColor = color
      storage.set(STORAGE_KEYS.PRIMARY_COLOR, color)
      document.documentElement.style.setProperty('--primary-color', color)
    },

    toggleSidebar(): void {
      this.sidebarCollapsed = !this.sidebarCollapsed
      storage.set(STORAGE_KEYS.SIDEBAR_COLLAPSED, this.sidebarCollapsed)
    },

    setSidebarCollapsed(collapsed: boolean): void {
      this.sidebarCollapsed = collapsed
      storage.set(STORAGE_KEYS.SIDEBAR_COLLAPSED, collapsed)
    },

    setLanguage(lang: Language): void {
      this.language = lang
      storage.set(STORAGE_KEYS.LANGUAGE, lang)
    },

    setLoading(loading: boolean, text = ''): void {
      this.isLoading = loading
      this.loadingText = text
    },

    detectDevice(): void {
      this.isMobile = window.innerWidth < 768
      if (this.isMobile) {
        this.sidebarCollapsed = true
      }
    },
  },
})
