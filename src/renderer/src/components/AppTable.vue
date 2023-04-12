<template>
  <LoadingScreen v-if="loading" />
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y-2 divide-gray-200 text-sm">
      <thead>
        <slot name="thead"></slot>
      </thead>

      <tbody class="divide-y divide-gray-200">
        <slot name="tbody"></slot>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import LoadingScreen from './LoadingScreen.vue'

defineProps({
  loading: {
    type: Boolean
  }
})
</script>
<style scoped>
:deep(th) {
  @apply px-4 py-2 text-left font-medium text-gray-900;
}
:deep(td) {
  @apply px-4 py-2 text-gray-700;
}
</style>
