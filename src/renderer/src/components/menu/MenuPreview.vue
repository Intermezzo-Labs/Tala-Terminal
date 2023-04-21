<template>
  <AppPanel
    title="Table Name"
    class="h-full space-y-4 md:space-y-0 md:flex flex-col justify-between px-8"
  >
    <template #actions>
      <button v-if="hasSelectedItems" class="link" @click="handleOrderReset">Clear</button>
    </template>
    <div class="flex-1 md:overflow-auto">
      <MenuPreviewSelectedItems v-if="hasSelectedItems" />
      <span v-else>No items</span>
    </div>
    <div
      class="space-y-4 md:space-y-8 transition-all delay-200 ease-in bg-hover-state text-highlight p-4 rounded"
      :class="hasSelectedItems ? 'opacity-100' : 'md:opacity-0'"
    >
      <MenuPreviewSubtotal />
      <div :class="hasSelectedItems ? 'fixed inset-4 top-auto sm:static' : ''">
        <h3 class="text-sm text-base-text">Payment Method</h3>
        <MenuPreviewPaymentMethods />
        <button
          type="button"
          class="btn"
          :disabled="!selectedPaymentMethod"
          @click="handlePlaceOrder"
        >
          Place Order
        </button>
      </div>
    </div>
  </AppPanel>
</template>

<script setup lang="ts">
import { MENU_KEY } from '@renderer/keys'
import { requireInjection } from '@renderer/utils'
import AppPanel from '../AppPanel.vue'
import MenuPreviewSelectedItems from './MenuPreviewSelectedItems.vue'
import MenuPreviewPaymentMethods from './MenuPreviewPaymentMethods.vue'
import MenuPreviewSubtotal from './MenuPreviewSubtotal.vue'

const { hasSelectedItems, selectedPaymentMethod, handlePlaceOrder, handleOrderReset } =
  requireInjection(MENU_KEY)
</script>
