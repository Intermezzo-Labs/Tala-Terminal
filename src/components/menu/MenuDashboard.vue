<template>
  <div class="md:grid md:grid-cols-12 h-full">
    <div class="md:col-span-8 overflow-auto">
      <MenuItems />
    </div>
    <div class="md:col-span-4 h-full overflow-hidden">
      <MenuPreview />
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuPreview from './MenuPreview.vue'
import MenuItems from './MenuItems.vue'
</script>
