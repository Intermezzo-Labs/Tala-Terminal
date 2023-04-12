<template>
  <div class="bg-white shadow-xl rounded-2xl p-4 flex gap-4 flex-wrap">
    <figure v-if="item.details.image" class="w-10">
      <picture>
        <img :src="item.details.image" alt="product" class="rounded" />
      </picture>
    </figure>
    <div v-if="item" class="flex-1 space-y-2">
      <h4 class="text-sm font-semibold">{{ item.details.name }}</h4>
      <p class="text-xs">${{ item.details.price }}</p>
    </div>
    <div class="flex justify-between gap-2 w-full">
      <button type="button" class="text-xs link" disabled @click="$emit('clicked:add-note')">
        Add notes
      </button>
      <div class="inline-flex items-center">
        <button type="button" class="btn inventory-btn" @click="$emit('clicked:quantity', -1)">
          -
        </button>
        <span class="inline-block w-8 text-center">{{ item.quantity }}</span>
        <button type="button" class="btn inventory-btn" @click="$emit('clicked:quantity', 1)">
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import type { OrderItem } from 'interfaces/graphql.type'

const props = defineProps({
  item: {
    type: Object as PropType<OrderItem>,
    default: () => {},
    required: true
  }
})

defineEmits(['clicked:add-note', 'clicked:quantity'])
</script>

<style scoped>
.inventory-btn {
  @apply w-5 h-5 p-0 inline-flex items-center justify-center;
}
</style>
