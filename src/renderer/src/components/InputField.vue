<template>
  <label
    :for="String($attrs.id)"
    class="relative block overflow-hidden rounded-md bg-hover-state px-3 pt-3 shadow-sm focus-within:ring-1 focus-within:ring-accent"
  >
    <input
      :type="String($attrs.type) ?? 'text'"
      :value="modelValue"
      v-bind="$attrs"
      class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-highlight sm:text-sm"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <span
      class="absolute start-3 top-3 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
    >
      {{ label }}
    </span>
  </label>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: false,
    default: ''
  },
  modelValue: {
    type: [String, Number]
  }
})
defineEmits(['update:modelValue'])
</script>
