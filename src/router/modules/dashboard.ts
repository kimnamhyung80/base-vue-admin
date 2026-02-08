import type { RouteRecordRaw } from 'vue-router'

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: {
          title: '대시보드',
          icon: 'dashboard',
        },
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import('@/views/dashboard/AnalyticsView.vue'),
        meta: {
          title: '분석',
          icon: 'analytics',
        },
      },
    ],
  },
  {
    path: '/users',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: {
      requiresAuth: true,
      roles: ['admin', 'manager'],
    },
    children: [
      {
        path: '',
        name: 'UserList',
        component: () => import('@/views/users/UserListView.vue'),
        meta: {
          title: '사용자 관리',
          icon: 'users',
        },
      },
      {
        path: ':id',
        name: 'UserDetail',
        component: () => import('@/views/users/UserDetailView.vue'),
        meta: {
          title: '사용자 상세',
        },
      },
    ],
  },
  {
    path: '/settings',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'Settings',
        component: () => import('@/views/settings/SettingsView.vue'),
        meta: {
          title: '설정',
          icon: 'settings',
        },
      },
    ],
  },
]
