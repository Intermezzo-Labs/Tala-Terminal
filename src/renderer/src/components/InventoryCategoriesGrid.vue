<template>
  <div class="flex gap-4 md:gap-8" :class="$attrs.class">
    <div v-if="loading" class="shrink-0 h-24 w-24 shadow-xl bg-neutral-50 rounded-2xl absolute">
      <LoadingScreen />
    </div>
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      class="shrink-0 h-24 w-24 shadow-lg rounded-2xl"
      :class="{
        'btn px-0': isSelected(item.id)
      }"
      @click="$emit('item-selected', item.id)"
    >
      <figure>
        <!-- <picture class="block">
          <img src="" alt="item" />
        </picture> -->
        <div class="bg-orange-200 h-4 w-4 rounded-full mx-auto mb-2"></div>
      </figure>
      <h4 class="font-bold">{{ item.name }}</h4>
    </button>
  </div>
</template>

<script setup lang="ts">
import { InventoryCategory } from 'interfaces/graphql.type'
import { PropType } from 'vue'
import LoadingScreen from './LoadingScreen.vue'

const props = defineProps({
  items: {
    type: Array as PropType<InventoryCategory[]>,
    default: () => [],
    required: false
  },
  selectedItemId: {
    type: Number as PropType<InventoryCategory['id']>,
    default: null,
    required: false
  },
  loading: {
    type: Boolean,
    default: false,
    required: false
  }
})

function isSelected(itemId: InventoryCategory['id']): boolean {
  return itemId === props.selectedItemId
}

defineEmits(['item-selected'])
</script>
