<template>
  <div class="flex-1 md:overflow-auto">
    <div v-if="hasSelectedItems" class="space-y-1">
      <div
        v-for="(quantity, id) in selectedItems"
        :key="id"
        class="rounded p-3 flex text-sm bg-hover-state text-highlight gap-2 items-center"
      >
        <span
          class="bg-highlight text-base-bg inline-block h-4 w-4 text-center rounded-full text-xs font-medium"
          >{{ getSelectedItemIndexById(id as string) }}</span
        >
        <h4 class="flex-1">
          {{ getInventoryItemById(id as string)?.name }}
          <span class="text-base-text">x{{ quantity }}</span>
        </h4>

        <p>${{ (getInventoryItemById(id as string)?.price ?? 0) * quantity }}</p>
      </div>
    </div>
    <span v-else>No items</span>
  </div>
  <div
    class="space-y-4 md:space-y-8 transition-all delay-200 ease-in bg-hover-state text-highlight p-4 rounded"
    :class="hasSelectedItems ? 'opacity-100' : 'md:opacity-0'"
  >
    <div>
      <dl class="grid grid-cols-2 text-sm gap-y-2">
        <dt><h3>Subtotal</h3></dt>
        <dd class="text-right">{{ formatCurrency(preview.subtotal) }}</dd>
        <dt>
          <span class="text-sm font-normal">Tax {{ taxRate }}%</span>
        </dt>
        <dd class="text-right">{{ formatCurrency(preview.tax) }}</dd>
        <hr class="col-span-2 my-1 border-focus-state border-dashed" />
        <dt class="text-lg"><h3>Total</h3></dt>
        <dd class="text-right text-lg">{{ formatCurrency(preview.total) }}</dd>
      </dl>
    </div>
    <div :class="hasSelectedItems ? 'fixed inset-4 top-auto sm:static' : ''">
      <h3 class="text-sm text-base-text">Payment Method</h3>
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
      <button
        type="button"
        class="btn"
        :disabled="!selectedPaymentMethod"
        @click="handlePlaceOrder"
      >
        Place Order
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MENU_KEY } from '@renderer/keys'
import { requireInjection } from '@renderer/utils'
import AppIcon from '../AppIcon.vue'

const {
  taxRate,
  selectedItems,
  hasSelectedItems,
  paymentMethods,
  selectedPaymentMethod,
  handlePlaceOrder,
  getSelectedItemIndexById,
  getInventoryItemById,
  preview
} = requireInjection(MENU_KEY)

function formatCurrency(value: number, currency = 'USD'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    currency,
    style: 'currency',
    minimumFractionDigits: 2
  })
  return formatter.format(value)
}
</script>
