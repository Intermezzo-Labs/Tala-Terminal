<template>
  <div class="md:grid md:grid-cols-12 h-full">
    <div class="md:col-span-8 overflow-auto">
      <AppPanel class="pl-0">
        <template #actions>
          <InputField label="Search" />
        </template>
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
        <hr class="my-4 border-1 border-focus-state" />
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <button
            v-for="item in categories.find((c) => c.id === selectedCategory)?.items"
            :key="item.id"
            type="button"
            class="relative overflow-hidden rounded before:bg-teal-200 before:absolute before:inset-0 before:transition-transform"
            :class="
              isItemSelected(item.id)
                ? 'text-hover-state'
                : 'bg-hover-state before:-translate-x-[98%]'
            "
            @click="handleQuantityUpdate(item.id, 1)"
          >
            <div class="relative flex flex-col justify-between text-left p-4 gap-2 h-36">
              <p class="text-xs">
                Orders <AppIcon name="arrow-right" class="h-2 mx-1 inline" /> Kitchen
              </p>
              <div class="flex-1">
                <h5
                  class="text-sm font-medium"
                  :class="{ 'text-highlight': !isItemSelected(item.id) }"
                >
                  {{ item.name }}
                </h5>
                <p class="text-xs">${{ item.price }}</p>
              </div>
              <div class="flex justify-between gap-2 self-end">
                <div class="inline-flex items-center">
                  <button
                    type="button"
                    class="quantity-btn"
                    @click.stop="handleQuantityUpdate(item.id, -1)"
                  >
                    <AppIcon name="minus" class="h-4 w-4" />
                  </button>
                  <span class="inline-block w-8 text-center font-medium">{{
                    selectedItems[item.id] ?? 0
                  }}</span>
                  <button
                    type="button"
                    class="quantity-btn"
                    @click.stop="handleQuantityUpdate(item.id, 1)"
                  >
                    <AppIcon name="plus" class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </button>
        </div>
      </AppPanel>
    </div>
    <div class="md:col-span-4 h-full overflow-hidden">
      <AppPanel
        title="Table Name"
        class="h-full space-y-4 md:space-y-0 md:flex flex-col justify-between px-8"
      >
        <template #actions>
          <button v-if="hasSelectedItems" class="link" @click="handleOrderReset">Clear</button>
        </template>

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
      </AppPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppPanel from 'components/AppPanel.vue'
import AppIcon from 'components/AppIcon.vue'
import InputField from 'components/InputField.vue'
import { requireInjection } from '@renderer/utils'
import { MENU_KEY } from '@renderer/keys'

const {
  taxRate,
  categories,
  selectedCategory,
  selectedItems,
  hasSelectedItems,
  paymentMethods,
  selectedPaymentMethod,
  isItemSelected,
  handleOrderReset,
  handlePlaceOrder,
  handleQuantityUpdate,
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

<style scoped>
.quantity-btn {
  @apply border border-focus-state h-6 w-6 rounded inline-flex items-center justify-center;
}
</style>
