<template>
  <div class="p-4 md:px-8 md:py-16">
    <div class="mb-8">
      <h2>Inventory</h2>
      <button type="button" @click="modalStore.openModal(InventoryCreateItem)">Create item</button>
    </div>
    <pre>{{ inventory }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useModalsStore } from '@renderer/stores/modals'
import InventoryCreateItem from '../components/InventoryCreateItem.vue'
import { onMounted, ref } from 'vue'

const inventory = ref()

onMounted(async () => {
  inventory.value = await window.api.inventory.getInventoryItems()
})

const modalStore = useModalsStore()
</script>
