<template>
  <header class="flex lg:flex-col justify-between gap-8" :class="$attrs.class">
    <h1 class="font-medium text-lg">Intermezzo POS</h1>
    <nav
      class="flex-col gap-8 items-center justify-center font-medium underline-offset-4"
      :class="openNav ? 'flex absolute inset-0 bg-black' : 'hidden lg:flex'"
    >
      <RouterLink
        v-for="item in navItems"
        :key="item.routeName"
        :to="{ name: item.routeName }"
        active-class="underline"
      >
        {{ item.text }}
      </RouterLink>
    </nav>
    <button class="inline lg:hidden" type="button" @click="openNav = !openNav">
      <span class="relative z-40">{{ openNav ? 'Close' : 'Open' }}</span>
    </button>
    <p class="text-xs text-slate-600">by Intermezzo Labs</p>
  </header>
</template>

<script setup lang="ts">
import { RouteName } from '@renderer/router/routeNames'
import { Component, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

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
