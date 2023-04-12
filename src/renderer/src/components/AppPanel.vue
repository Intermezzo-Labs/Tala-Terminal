<template>
  <div class="p-4 md:px-8 md:py-16">
    <div class="mb-8 flex justify-between">
      <h2>{{ title }}</h2>
      <div>
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
