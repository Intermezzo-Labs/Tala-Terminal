<template>
  <AppPanel class="pl-0">
    <template #actions>
      <InputField label="Search" />
    </template>
    <MenuCategoriesGrid />
    <hr class="my-4 border-1 border-focus-state" />
    <MenuItemsGrid />
  </AppPanel>
</template>

<script setup lang="ts">
import AppPanel from '../AppPanel.vue'
import InputField from '../InputField.vue'
import MenuCategoriesGrid from './MenuCategoriesGrid.vue'
import MenuItemsGrid from './MenuItemsGrid.vue'
</script>
