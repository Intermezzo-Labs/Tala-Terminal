<template>
  <div class="space-y-1">
    <div
      v-for="(quantity, id) in selectedItems"
      :key="id"
      class="rounded p-3 flex text-sm bg-hover-state text-highlight gap-2 items-center"
    >
      <span
        class="bg-highlight text-base-bg inline-block h-4 w-4 text-center rounded-full text-xs font-medium"
        >{{ getSelectedItemIndexById(id as string) }}</span
      >
      <h4 class="flex-1">
        {{ getInventoryItemById(id as string)?.name }}
        <span class="text-base-text">x{{ quantity }}</span>
      </h4>

      <p>${{ itemSubtotal(getInventoryItemById(id as string)?.price, quantity) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MENU_KEY } from '@renderer/keys'
import { requireInjection } from '@renderer/utils'

const { selectedItems, getSelectedItemIndexById, getInventoryItemById } = requireInjection(MENU_KEY)

function itemSubtotal(price = 0, quantity: number): string {
  return Number(price * quantity).toFixed(2)
}
</script>
