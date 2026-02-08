import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'
import { setupDirectives } from './directives'
import { setupErrorHandler } from './utils/errorHandler'

// Styles
import '@/styles/main.scss'

async function enableMocking(): Promise<void> {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    await worker.start({
      onUnhandledRequest: 'bypass', // 처리되지 않은 요청은 그대로 통과
    })
  }
}

async function bootstrap() {
  // MSW 활성화 (개발 환경에서만)
  await enableMocking()

  const app = createApp(App)

  // Pinia (State Management)
  const pinia = createPinia()
  app.use(pinia)

  // Router
  app.use(router)

  // i18n
  app.use(i18n)

  // Custom Directives
  setupDirectives(app)

  // Global Error Handler
  setupErrorHandler(app)

  // Mount
  await router.isReady()
  app.mount('#app')
}

bootstrap()
