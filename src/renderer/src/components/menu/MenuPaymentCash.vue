<template>
  <div class="p-8 bg-white rounded">
    <h2>Pay with cash</h2>
    <pre>{{ selectedItems }}</pre>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  selectedItems: {
    type: Object as PropType<Record<string, number>>,
    default: () => ({}),
    required: true
  }
})
</script>
