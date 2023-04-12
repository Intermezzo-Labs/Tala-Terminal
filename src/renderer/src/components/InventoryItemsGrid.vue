<template>
  <div class="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8">
    <div v-if="loading" class="bg-neutral-100 rounded-2xl flex flex-col justify-between p-4 gap-2">
      <LoadingScreen />
    </div>
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      class="shadow-xl rounded-2xl flex flex-col justify-between p-4 gap-2"
      @click="$emit('item-selected', item.id)"
    >
      <figure
        v-if="item.image"
        class="block w-32 h-32 mx-auto md:-mt-4 rounded-full overflow-hidden shadow-xl"
      >
        <picture>
          <img :src="item.image" alt="item" />
        </picture>
      </figure>
      <div class="flex-1 md:text-center space-y-1">
        <h4 class="font-bold">{{ item.name }}</h4>
        <p class="text-xs text-neutral-500">{{ item.description }}</p>
      </div>
      <div class="w-full flex justify-between items-center">
        <p class="text-xs text-green-600">Available</p>
        <p class="text-xl font-bold">${{ item.price }}</p>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { InventoryItem } from 'interfaces/graphql.type'
import { PropType } from 'vue'
import LoadingScreen from './LoadingScreen.vue'

defineProps({
  items: {
    type: Array as PropType<InventoryItem[]>,
    default: () => [],
    required: false
  },
  loading: {
    type: Boolean,
    default: false,
    required: false
  }
})

defineEmits(['item-selected'])
</script>
