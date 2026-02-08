import type { RouteRecordRaw } from 'vue-router'

export const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/error',
    component: () => import('@/layouts/BlankLayout.vue'),
    children: [
      {
        path: '403',
        name: 'Error403',
        component: () => import('@/views/error/Error403View.vue'),
        meta: {
          title: '접근 권한 없음',
        },
      },
      {
        path: '404',
        name: 'Error404',
        component: () => import('@/views/error/Error404View.vue'),
        meta: {
          title: '페이지를 찾을 수 없음',
        },
      },
      {
        path: '500',
        name: 'Error500',
        component: () => import('@/views/error/Error500View.vue'),
        meta: {
          title: '서버 오류',
        },
      },
    ],
  },
]
