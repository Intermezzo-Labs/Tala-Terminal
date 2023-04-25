<template>
  <LoadingScreen v-if="loading" />
  <div class="overflow-x-auto">
    <table class="min-w-full divide-focus-state text-sm">
      <thead class="border-b">
        <slot name="thead"></slot>
      </thead>

      <tbody v-if="$slots.tbody" class="divide-y divide-focus-state">
        <slot name="tbody"></slot>
      </tbody>
      <tfoot>
        <slot name="tfoot"></slot>
      </tfoot>
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
  @apply px-4 py-2 text-left font-medium;
}
:deep(td) {
  @apply px-4 py-2;
}
</style>
