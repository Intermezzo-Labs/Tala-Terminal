<template>
  <div
    class="lg:h-screen lg:w-screen lg:flex lg:min-h-screenlg:gap-8"
    :class="{ 'overflow-hidden w-screen h-screen': modalStore.hasModals }"
  >
    <AppHeader />
    <main class="flex-1">
      <div class="h-full overflow-auto">
        <RouterView />
      </div>
    </main>
  </div>
  <AppModals />
</template>

<script setup lang="ts">
import AppHeader from 'components/AppHeader.vue'
import AppModals from 'components/AppModals.vue'
import { useModalsStore } from '@renderer/stores/modals'

const modalStore = useModalsStore()
</script>
