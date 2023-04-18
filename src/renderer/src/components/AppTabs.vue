<template>
  <nav class="flex border-b border-current text-sm font-medium">
    <button
      v-for="item in items"
      :key="item.value"
      type="button"
      class="-mb-px border-b p-4 pt-2 transition-colors"
      :class="
        selectedItem === item.value
          ? 'border-current text-highlight'
          : 'border-transparent hover:highlight'
      "
      @click="$emit('item-selected', item.value)"
    >
      {{ item.text }}
    </button>
  </nav>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
defineEmits(['item-selected'])
defineProps({
  items: {
    type: Array as PropType<{ text: string; value: string }[]>,
    default: () => [],
    required: true
  },
  selectedItem: {
    type: String,
    default: '',
    required: false
  }
})
</script>
