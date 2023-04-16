import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import { RouteName } from './routeNames'

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.Home,
    redirect: RouteName.Menu
  },
  {
    path: '/inventory',
    name: RouteName.Inventory,
    component: () => import('../views/ViewInventory.vue')
  },
  {
    path: '/menu',
    name: RouteName.Menu,
    component: () => import('../views/ViewMenu.vue')
  },
  {
    path: '/orders',
    name: RouteName.Orders,
    component: () => import('../views/ViewOrders.vue')
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
