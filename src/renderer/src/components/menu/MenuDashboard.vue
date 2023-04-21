<template>
  <div class="md:grid md:grid-cols-12 h-full">
    <div class="md:col-span-8 overflow-auto">
      <AppPanel class="pl-0">
        <template #actions>
          <InputField label="Search" />
        </template>
        <MenuCategoriesGrid />
        <hr class="my-4 border-1 border-focus-state" />
        <MenuItemsGrid />
      </AppPanel>
    </div>
    <div class="md:col-span-4 h-full overflow-hidden">
      <AppPanel
        title="Table Name"
        class="h-full space-y-4 md:space-y-0 md:flex flex-col justify-between px-8"
      >
        <template #actions>
          <button v-if="hasSelectedItems" class="link" @click="handleOrderReset">Clear</button>
        </template>
      </AppPanel>
      <MenuPreview />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppPanel from 'components/AppPanel.vue'
import InputField from 'components/InputField.vue'
import { requireInjection } from '@renderer/utils'
import { MENU_KEY } from '@renderer/keys'
import MenuCategoriesGrid from './MenuCategoriesGrid.vue'
import MenuItemsGrid from './MenuItemsGrid.vue'
import MenuPreview from './MenuPreview.vue'

const { hasSelectedItems, handleOrderReset } = requireInjection(MENU_KEY)
</script>
