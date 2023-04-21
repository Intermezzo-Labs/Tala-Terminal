<template>
  <div class="grid grid-cols-3 gap-2 pt-2 pb-4">
    <button
      v-for="method in paymentMethods"
      :key="method.value"
      type="button"
      @click="selectedPaymentMethod = method.value"
    >
      <span
        class="border py-4 rounded flex items-center justify-center"
        :class="
          selectedPaymentMethod === method.value
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
import { MENU_KEY } from '@renderer/keys'
import AppIcon from '../AppIcon.vue'
import { requireInjection } from '@renderer/utils'

const { paymentMethods, selectedPaymentMethod } = requireInjection(MENU_KEY)
</script>
