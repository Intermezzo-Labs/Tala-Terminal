<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
    <button
      v-for="category in categories"
      :key="category.id"
      type="button"
      class="bg-pink-100 text-base-bg rounded p-4 flex flex-col h-28 justify-between"
      @click="selectedCategory = category.id"
    >
      <div><AppIcon name="pizza" class="h-6 w-6" /></div>
      <div class="text-left">
        <h4 class="font-semibold">{{ category.name }}</h4>
        <p class="text-xs text-base-text">{{ category.items?.length }} items</p>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { MENU_KEY } from '@renderer/keys'
import { requireInjection } from '@renderer/utils'
import AppIcon from '../AppIcon.vue'

const { categories, selectedCategory } = requireInjection(MENU_KEY)
</script>
