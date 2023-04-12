import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import { RouteName } from './routeNames'

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.Home,
    redirect: RouteName.Order
  },
  {
    path: '/inventory',
    name: RouteName.Inventory,
    component: () => import('../views/ViewInventory.vue')
  },
  {
    path: '/order',
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
