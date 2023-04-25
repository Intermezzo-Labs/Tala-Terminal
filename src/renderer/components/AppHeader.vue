<template>
  <header class="flex lg:flex-col justify-between w-56 p-8" :class="$attrs.class">
    <div class="flex items-start gap-1 px-4 h-16 text-highlight">
      <AppLogo class="h-6" />
      <h1 class="font-semibold">Tala Terminal</h1>
    </div>
    <nav
      class="flex-1 font-medium text-sm space-y-2"
      :class="openNav ? 'flex absolute inset-0 bg-bg-color' : 'hidden lg:block'"
    >
      <RouterLink
        v-for="item in navItems"
        :key="item.routeName"
        :to="{ name: item.routeName }"
        class="block py-2 px-4 rounded"
        active-class="bg-hover-state text-highlight"
      >
        {{ item.text }}
      </RouterLink>
    </nav>
    <button class="inline lg:hidden" type="button" @click="openNav = !openNav">
      <span class="relative z-40">{{ openNav ? 'Close' : 'Open' }}</span>
    </button>
    <p class="text-xs">by Intermezzo Labs</p>
  </header>
</template>

<script setup lang="ts">
import { RouteName } from '@renderer/router/routeNames'
import { Component, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppLogo from './AppLogo.vue'

interface INavItem {
  text: string
  routeName: RouteName
  icon?: Component
}
const navItems: INavItem[] = [
  {
    text: 'Menu',
    routeName: RouteName.Menu
  },
  {
    text: 'Orders',
    routeName: RouteName.Orders
  },
  {
    text: 'Inventory',
    routeName: RouteName.Inventory
  },
  {
    text: 'Settings',
    routeName: RouteName.Settings
  }
]
const openNav = ref()
const route = useRoute()

watch(
  () => route.path,
  () => (openNav.value = false)
)
</script>
