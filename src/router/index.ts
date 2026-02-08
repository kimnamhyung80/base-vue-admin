import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Route modules
import { authRoutes } from './modules/auth'
import { dashboardRoutes } from './modules/dashboard'
import { errorRoutes } from './modules/error'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  ...authRoutes,
  ...dashboardRoutes,
  ...errorRoutes,
  // Catch-all 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error/404',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  },
})

// Navigation Guards
router.beforeEach(
  async (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const authStore = useAuthStore()

    // Set page title
    document.title = to.meta.title
      ? `${to.meta.title as string} | ${import.meta.env.VITE_APP_TITLE}`
      : import.meta.env.VITE_APP_TITLE

    // Check authentication
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next({ name: 'Login', query: { redirect: to.fullPath } })
      return
    }

    // Check permissions
    if (to.meta.permissions) {
      const hasPermission = authStore.hasPermission(to.meta.permissions as string[])
      if (!hasPermission) {
        next({ name: 'Error403' })
        return
      }
    }

    // Check roles
    if (to.meta.roles) {
      const hasRole = authStore.hasRole(to.meta.roles as string[])
      if (!hasRole) {
        next({ name: 'Error403' })
        return
      }
    }

    next()
  }
)

router.afterEach(() => {
  // NProgress finish, analytics, etc.
})

export default router
