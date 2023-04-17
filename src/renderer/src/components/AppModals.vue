<template>
  <div v-if="modalStore.hasModals">
    <div v-for="modal in modalStore.modals" :key="modal.id" class="absolute inset-0">
      <div class="flex h-full w-full items-center justify-center">
        <div class="relative z-10">
          <component
            :is="modal.component"
            v-bind="modal.props"
            @close="modalStore.closeModal(modal.id)"
          />
        </div>
      </div>
      <div class="bg-base-bg/80 absolute inset-0" @click="modalStore.closeModal(modal.id)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalsStore } from '@renderer/stores/modals'

const modalStore = useModalsStore()
</script>
