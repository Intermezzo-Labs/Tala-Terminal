import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import { RouteName } from './routeNames'

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.Home,
    redirect: RouteName.Order
  },
  {
    path: '/menu',
    name: RouteName.Order,
    component: () => import('../views/ViewOrder.vue')
  },
  {
    path: '/history',
    name: RouteName.History,
    component: () => import('../views/ViewHistory.vue')
  },
  {
    path: '/settings',
    name: RouteName.Settings,
    component: () => import('../views/ViewSettings.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
