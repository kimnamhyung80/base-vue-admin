import type { App } from 'vue'

/**
 * Global error handler setup
 */
export function setupErrorHandler(app: App): void {
  // Vue error handler
  app.config.errorHandler = (err, instance, info) => {
    console.error('[Vue Error]', err)
    console.error('[Component]', instance)
    console.error('[Info]', info)

    // TODO: Send to error tracking service (Sentry, etc.)
    reportError(err as Error, {
      type: 'vue',
      componentName: instance?.$options?.name ?? 'Unknown',
      info,
    })
  }

  // Vue warning handler (development only)
  if (import.meta.env.DEV) {
    app.config.warnHandler = (msg, instance, trace) => {
      console.warn('[Vue Warning]', msg)
      console.warn('[Component]', instance)
      console.warn('[Trace]', trace)
    }
  }

  // Global unhandled error
  window.addEventListener('error', (event) => {
    console.error('[Global Error]', event.error)
    reportError(event.error as Error, { type: 'global' })
  })

  // Unhandled promise rejection
  window.addEventListener('unhandledrejection', (event) => {
    console.error('[Unhandled Promise Rejection]', event.reason)
    reportError(event.reason as Error, { type: 'promise' })
  })
}

/**
 * Report error to tracking service
 */
function reportError(error: Error, context: Record<string, unknown>): void {
  // TODO: Implement error reporting to external service
  // Example: Sentry.captureException(error, { extra: context })

  if (import.meta.env.DEV) {
    console.group('🔴 Error Report')
    console.error('Error:', error)
    console.info('Context:', context)
    console.groupEnd()
  }
}

/**
 * Try-catch wrapper for async functions
 */
export async function tryCatch<T>(
  fn: () => Promise<T>,
  fallback?: T
): Promise<[T, null] | [T | undefined, Error]> {
  try {
    const result = await fn()
    return [result, null]
  } catch (error) {
    return [fallback, error as Error]
  }
}
