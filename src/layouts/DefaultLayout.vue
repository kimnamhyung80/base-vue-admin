<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'

const appStore = useAppStore()
const authStore = useAuthStore()
const router = useRouter()

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: 'dashboard', title: '대시보드' },
  { name: 'Analytics', path: '/dashboard/analytics', icon: 'analytics', title: '분석' },
  { name: 'UserList', path: '/users', icon: 'users', title: '사용자 관리', roles: ['admin', 'manager'] },
  { name: 'Settings', path: '/settings', icon: 'settings', title: '설정' },
]

const visibleMenuItems = computed(() => {
  return menuItems.filter((item) => {
    if (!item.roles) return true
    return item.roles.some((role) => authStore.userRole === role)
  })
})

function handleLogout(): void {
  authStore.logout()
  router.push('/auth/login')
}
</script>

<template>
  <div class="default-layout">
    <!-- Sidebar -->
    <aside
      :class="[
        'sidebar',
        { 'sidebar--collapsed': appStore.sidebarCollapsed }
      ]"
    >
      <div class="sidebar-header">
        <h1 class="logo">
          {{ appStore.sidebarCollapsed ? 'V' : 'VueBase' }}
        </h1>
      </div>
      
      <nav class="sidebar-nav">
        <RouterLink
          v-for="item in visibleMenuItems"
          :key="item.name"
          :to="item.path"
          class="nav-item"
          active-class="nav-item--active"
        >
          <span class="nav-icon">{{ item.icon.charAt(0).toUpperCase() }}</span>
          <span
            v-if="!appStore.sidebarCollapsed"
            class="nav-text"
          >
            {{ item.title }}
          </span>
        </RouterLink>
      </nav>
      
      <div class="sidebar-footer">
        <button
          class="logout-btn"
          @click="handleLogout"
        >
          {{ appStore.sidebarCollapsed ? '↩' : '로그아웃' }}
        </button>
      </div>
    </aside>
    
    <!-- Main Content -->
    <div class="main-wrapper">
      <!-- Header -->
      <header class="main-header">
        <button
          class="menu-toggle"
          @click="appStore.toggleSidebar"
        >
          ☰
        </button>
        
        <div class="header-right">
          <span class="user-info">
            {{ authStore.currentUser?.displayName ?? '사용자' }}
          </span>
        </div>
      </header>
      
      <!-- Content -->
      <main class="main-content">
        <RouterView />
      </main>
    </div>
    
    <LoadingOverlay />
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--gray-50, #f9fafb);
}

.sidebar {
  display: flex;
  flex-direction: column;
  width: 240px;
  background-color: var(--gray-900, #111827);
  color: white;
  transition: width 0.3s ease;

  &--collapsed {
    width: 64px;
  }
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  border-bottom: 1px solid var(--gray-800, #1f2937);
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--gray-400, #9ca3af);
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--gray-800, #1f2937);
    color: white;
  }

  &--active {
    background-color: var(--primary-color, #1890ff);
    color: white;
  }

  .sidebar--collapsed & {
    justify-content: center;
    padding: 0.75rem;
  }
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-weight: 600;
}

.nav-text {
  font-size: 0.875rem;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid var(--gray-800, #1f2937);
}

.logout-btn {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: var(--radius-md, 6px);
  background-color: var(--gray-800, #1f2937);
  color: var(--gray-400, #9ca3af);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--gray-700, #374151);
    color: white;
  }
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 1.5rem;
  background-color: white;
  border-bottom: 1px solid var(--gray-200, #e5e7eb);
}

.menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: var(--radius-md, 6px);
  background-color: transparent;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--gray-100, #f3f4f6);
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  font-size: 0.875rem;
  color: var(--gray-700, #374151);
}

.main-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}
</style>
