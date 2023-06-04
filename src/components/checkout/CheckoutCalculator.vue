<template>
  <div class="grid grid-cols-3 gap-1">
    <button v-for="n in 9" :key="n" type="button" class="calculator-btn" @click="handleInput(n)">
      {{ n }}
    </button>
    <button type="button" class="calculator-btn" @click="handleInput('.')">.</button>
    <button type="button" class="calculator-btn" @click="handleInput(0)">0</button>
    <button type="button" class="calculator-btn" @click="handleDelete">
      <AppIcon name="arrow-right" class="rotate-180 w-6 mx-auto" />
    </button>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '../AppIcon.vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

function handleInput(key: string | number): void {
  if (key === '.' && props.modelValue.includes('.')) return
  const value = `${props.modelValue}${key}`
  emit('update:modelValue', value)
}
function handleDelete(): void {
  if (!props.modelValue.length) return
  emit('update:modelValue', props.modelValue.slice(0, props.modelValue.length - 1))
}
</script>

<style scoped>
.calculator-btn {
  @apply text-2xl py-4 bg-hover-state rounded hover:bg-focus-state;
}
</style>
