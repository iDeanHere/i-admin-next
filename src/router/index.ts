import { Router, createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'Dashboard', icon: 'dashboard' },
      },
    ],
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: '',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
        meta: { title: 'About', icon: 'example' },
      },
    ],
  },
]
const doCreateRouter = (): Router => {
  return createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: (to: any, from: any, savedPosition: any) => {
      if (savedPosition) {
        return savedPosition
      } else {
        return { left: 0, top: 0 }
      }
    },
  })
}

const router: Router = doCreateRouter()

export function resetRouter() {
  const newRouter: Router = doCreateRouter()
  router.options.routes = newRouter.options.routes // FIXME router.matcher?
}

export default router
