import type { App, Directive, DirectiveBinding } from 'vue'

/**
 * v-click-outside directive
 * Detects clicks outside of an element
 */
const clickOutside: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const handler = (event: MouseEvent) => {
      if (!el.contains(event.target as Node) && typeof binding.value === 'function') {
        binding.value(event)
      }
    }
    ;(el as HTMLElement & { _clickOutside: (e: MouseEvent) => void })._clickOutside = handler
    document.addEventListener('click', handler)
  },
  unmounted(el: HTMLElement) {
    const handler = (el as HTMLElement & { _clickOutside?: (e: MouseEvent) => void })._clickOutside
    if (handler) {
      document.removeEventListener('click', handler)
    }
  },
}

/**
 * v-focus directive
 * Auto-focus element on mount
 */
const focus: Directive = {
  mounted(el: HTMLElement) {
    el.focus()
  },
}

/**
 * v-loading directive
 * Shows loading overlay on element
 */
const loading: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    el.style.position = 'relative'
    updateLoading(el, binding.value)
  },
  updated(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    updateLoading(el, binding.value)
  },
}

function updateLoading(el: HTMLElement, isLoading: boolean): void {
  const loadingEl = el.querySelector('.v-loading-overlay')

  if (isLoading) {
    if (!loadingEl) {
      const overlay = document.createElement('div')
      overlay.className = 'v-loading-overlay'
      overlay.innerHTML = `
        <div class="v-loading-spinner"></div>
      `
      overlay.style.cssText = `
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.8);
        z-index: 10;
      `
      const spinner = overlay.querySelector('.v-loading-spinner') as HTMLElement
      if (spinner) {
        spinner.style.cssText = `
          width: 24px;
          height: 24px;
          border: 2px solid #e5e7eb;
          border-top-color: #1890ff;
          border-radius: 50%;
          animation: v-loading-spin 0.8s linear infinite;
        `
      }
      el.appendChild(overlay)
    }
  } else {
    loadingEl?.remove()
  }
}

/**
 * v-permission directive
 * Shows/hides element based on user permissions
 */
const permission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
    checkPermission(el, binding.value)
  },
  updated(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
    checkPermission(el, binding.value)
  },
}

function checkPermission(el: HTMLElement, permissions: string | string[]): void {
  // TODO: Implement permission check with auth store
  // const authStore = useAuthStore()
  const permList = Array.isArray(permissions) ? permissions : [permissions]
  // const hasPermission = authStore.hasPermission(permList)
  const hasPerm = permList.length > 0 // Placeholder - always true if has permissions

  if (!hasPerm) {
    el.style.display = 'none'
  } else {
    el.style.display = ''
  }
}

/**
 * Register all directives
 */
export function setupDirectives(app: App): void {
  app.directive('click-outside', clickOutside)
  app.directive('focus', focus)
  app.directive('loading', loading)
  app.directive('permission', permission)

  // Add loading animation keyframes
  const style = document.createElement('style')
  style.textContent = `
    @keyframes v-loading-spin {
      to { transform: rotate(360deg); }
    }
  `
  document.head.appendChild(style)
}

export { clickOutside, focus, loading, permission }
