<template>
  <header class="flex lg:flex-col justify-between lg:justify-start gap-16" :class="$attrs.class">
    <div class="flex items-center gap-4 lg:pt-16">
      <img
        alt="Developer"
        src="https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
        class="h-10 w-10 lg:h-16 lg:w-16 rounded-full object-cover"
      />

      <div>
        <h3 class="hidden sm:block text-lg font-medium text-white">Mezzie</h3>

        <div class="flow-root">
          <ul class="-m-1 flex flex-wrap">
            <li class="p-1 leading-none">
              <a href="#" class="text-xs font-medium text-gray-300"> Switch account </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <nav
      class="flex-col gap-8 items-center justify-center font-medium underline-offset-4"
      :class="openNav ? 'flex absolute inset-0 bg-black' : 'hidden lg:flex'"
    >
      <RouterLink
        v-for="item in navItems"
        :key="item.routeName"
        :to="{ name: item.routeName }"
        active-class="underline"
        >{{ item.text }}</RouterLink
      >
    </nav>
    <button class="inline lg:hidden" type="button" @click="openNav = !openNav">
      <span class="relative z-40">{{ openNav ? 'Close' : 'Open' }}</span>
    </button>
    <AppVersions class="hidden lg:block" />
  </header>
</template>

<script setup lang="ts">
import { RouteName } from '@renderer/router/routeNames'
import { Component, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppVersions from './AppVersions.vue'

interface INavItem {
  text: string
  routeName: RouteName
  icon?: Component
}
const navItems: INavItem[] = [
  {
    text: 'Home',
    routeName: RouteName.Home
  },
  {
    text: 'Inventory',
    routeName: RouteName.Inventory
  },
  {
    text: 'Order',
    routeName: RouteName.Order
  },
  {
    text: 'History',
    routeName: RouteName.History
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
