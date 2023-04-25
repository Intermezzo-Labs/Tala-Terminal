<template>
  <div class="grid grid-cols-3 gap-2">
    <button
      v-for="method in checkoutMethods"
      :key="method.value"
      type="button"
      @click="$emit('update:modelValue', method.value)"
    >
      <span
        class="border py-4 rounded flex items-center justify-center"
        :class="
          modelValue === method.value
            ? 'bg-highlight text-base-bg border-transparent'
            : 'border-focus-state'
        "
      >
        <AppIcon :name="method.icon" class="h-6 w-6" />
      </span>
      <span class="text-sm">{{ method.text }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import AppIcon from '../AppIcon.vue'
import { CheckoutMethod } from '@shared/models'
import { checkoutMethods } from '@renderer/utils'

defineEmits(['update:modelValue'])

defineProps({
  modelValue: {
    type: String as PropType<string>,
    required: false,
    validator: (val: CheckoutMethod) =>
      [CheckoutMethod.CASH, CheckoutMethod.CREDIT_CARD, CheckoutMethod.E_WALLET].includes(val)
  }
})
</script>
