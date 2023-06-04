<template>
  <AppPanel title="Inventory" class="pr-8">
    <AppTabs :items="tabs" :selected-item="selectedTab" @item-selected="selectedTab = $event" />
    <component :is="selectedComponent"></component>
  </AppPanel>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AppPanel from '@/components/AppPanel.vue'
import AppTabs from '@/components/AppTabs.vue'
import InventoryItemsList from '@/components/InventoryItemsList.vue'
import InventoryCategoriesList from '@/components/InventoryCategoriesList.vue'

enum Tab {
  Items = 'items',
  Categories = 'categories'
}
const tabs = [
  {
    text: 'Items',
    value: Tab.Items
  },
  {
    text: 'Categories',
    value: Tab.Categories
  }
]
const selectedTab = ref(Tab.Items)

const selectedComponent = computed(() => {
  switch (selectedTab.value) {
    case Tab.Categories:
      return InventoryCategoriesList
    case Tab.Items:
    default:
      return InventoryItemsList
  }
})
</script>
