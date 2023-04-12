<template>
  <div class="grid grid-cols-2 xl:grid-cols-4 gap-2">
    <div
      v-for="item in items"
      :key="item.id"
      type="button"
      class="bg-slate-100 rounded flex flex-col justify-between text-left p-4 gap-2 h-36"
      @click="$emit('item-selected', item.id)"
    >
      <p class="text-xs text-slate-400">Orders → Kitchen</p>
      <div class="flex-1">
        <h5>{{ item.name }}</h5>
        <p class="text-xs text-slate-500">${{ item.price }}</p>
      </div>
      <div class="flex justify-between gap-2 self-end">
        <div class="inline-flex items-center">
          <button type="button" class="quantity-btn">-</button>
          <span class="inline-block w-8 text-center">{{ 0 }}</span>
          <button type="button" class="quantity-btn">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { InventoryItem } from '@shared/models'

defineProps({
  items: {
    type: Array as PropType<InventoryItem[]>,
    default: () => [],
    required: false
  }
})

defineEmits(['item-selected'])
</script>

<style scoped>
.quantity-btn {
  @apply border h-8 w-8 rounded;
}
</style>
