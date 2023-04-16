<template>
  <div class="p-4 md:px-8 md:py-16">
    <div v-if="title || $slots.actions" class="h-16 flex justify-between">
      <h2 v-if="title">{{ title }}</h2>
      <div class="space-x-4">
        <slot name="actions"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String
  }
})
</script>
