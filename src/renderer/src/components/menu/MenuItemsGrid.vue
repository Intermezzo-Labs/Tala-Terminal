<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-2">
    <button
      v-for="item in categories.find((c) => c.id === selectedCategory)?.items"
      :key="item.id"
      type="button"
      class="relative overflow-hidden rounded before:bg-teal-200 before:absolute before:inset-0 before:transition-transform"
      :class="
        isItemSelected(item.id) ? 'text-hover-state' : 'bg-hover-state before:-translate-x-[98%]'
      "
      @click="handleQuantityUpdate(item.id, 1)"
    >
      <div class="relative flex flex-col justify-between text-left p-4 gap-2 h-36">
        <p class="text-xs">Orders <AppIcon name="arrow-right" class="h-2 mx-1 inline" /> Kitchen</p>
        <div class="flex-1">
          <h5 class="text-sm font-medium" :class="{ 'text-highlight': !isItemSelected(item.id) }">
            {{ item.name }}
          </h5>
          <p class="text-xs">${{ item.price }}</p>
        </div>
        <div class="flex justify-between gap-2 self-end">
          <div class="inline-flex items-center">
            <button
              type="button"
              class="quantity-btn"
              @click.stop="handleQuantityUpdate(item.id, -1)"
            >
              <AppIcon name="minus" class="h-4 w-4" />
            </button>
            <span class="inline-block w-8 text-center font-medium">{{
              selectedItems[item.id] ?? 0
            }}</span>
            <button
              type="button"
              class="quantity-btn"
              @click.stop="handleQuantityUpdate(item.id, 1)"
            >
              <AppIcon name="plus" class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { MENU_KEY } from '@renderer/keys'
import { requireInjection } from '@renderer/utils'
import AppIcon from '../AppIcon.vue'

const { handleQuantityUpdate, selectedItems, isItemSelected, selectedCategory, categories } =
  requireInjection(MENU_KEY)
</script>

<style scoped>
.quantity-btn {
  @apply border border-focus-state h-6 w-6 rounded inline-flex items-center justify-center;
}
</style>
