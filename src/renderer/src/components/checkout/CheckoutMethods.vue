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
import { CheckoutMethod } from '@shared/models'
import AppIcon from '../AppIcon.vue'

defineEmits(['update:modelValue'])

defineProps({
  modelValue: {
    required: true,
    validator(v: CheckoutMethod) {
      return v === undefined || CheckoutMethod[v] !== undefined
    }
  }
})

interface CheckoutMethodItem {
  text: string
  value: CheckoutMethod
  icon: string
}
const checkoutMethods: CheckoutMethodItem[] = [
  {
    text: 'Cash',
    value: CheckoutMethod.CASH,
    icon: 'cash'
  },
  {
    text: 'Credit Card',
    value: CheckoutMethod.CREDIT_CARD,
    icon: 'credit-card'
  },
  {
    text: 'E-Wallet',
    value: CheckoutMethod.E_WALLET,
    icon: 'qr-code'
  }
]
</script>
