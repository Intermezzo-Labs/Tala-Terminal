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
          >
            <div><span class="text-xs">icon</span></div>
            <div class="text-left">
              <h4 class="font-semibold">{{ category.name }}</h4>
              <p class="text-xs text-base-text">5 items</p>
            </div>
          </button>
        </div>
        <hr class="my-4 border-1 border-focus-state" />
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <button
            v-for="item in items"
            :key="item.id"
            type="button"
            class="rounded flex flex-col justify-between text-left p-4 pl-3 gap-2 h-36 border-l-4"
            :class="
              isItemSelected(item.id)
                ? 'bg-teal-100 text-hover-state border-transparent'
                : 'bg-hover-state border-teal-100'
            "
            @click="handleQuantityUpdate(item.id, 1)"
          >
            <p class="text-xs">Orders → Kitchen</p>
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
                  -
                </button>
                <span class="inline-block w-8 text-center font-medium">{{
                  selectedItems[item.id] ?? 0
                }}</span>
                <button
                  type="button"
                  class="quantity-btn"
                  @click.stop="handleQuantityUpdate(item.id, 1)"
                >
                  +
                </button>
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
            <button
              type="button"
              class="bg-highlight py-2 block w-full text-center rounded-full text-base-bg font-medium"
              disabled
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
import { ref, computed, reactive, onMounted } from 'vue'
import { InventoryCategory, InventoryItem } from 'src/shared/models'
import AppPanel from 'components/AppPanel.vue'
import InputField from 'components/InputField.vue'

const loading = ref(false)

const taxRate = ref(0)
const items = ref<InventoryItem[]>([])
const selectedItems = reactive<{ [id: InventoryItem['id']]: number }>({})
const hasSelectedItems = computed(() => Object.keys(selectedItems).length)
function isItemSelected(id: InventoryItem['id']): boolean {
  return Object.keys(selectedItems).includes(id)
}
function getSelectedItemIndexById(id: InventoryItem['id']): number {
  return Object.keys(selectedItems).findIndex((selectedId) => selectedId === id) + 1
}

const categories = ref<InventoryCategory[]>([])

onMounted(async () => {
  try {
    loading.value = true
    taxRate.value = 7
    items.value = await window.api.inventory.getInventoryItems()
    categories.value = await window.api.inventory.getInventoryCategories()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

function handleOrderReset(): void {
  Object.keys(selectedItems).forEach((id) => delete selectedItems[id])
}

function getInventoryItemById(id: string): InventoryItem | undefined {
  return items.value.find((item) => item.id === id)
}

function handleQuantityUpdate(id: InventoryItem['id'], quantity: 1 | -1): void {
  if (!selectedItems[id]) {
    selectedItems[id] = 0
  }
  quantity > 0 ? selectedItems[id]++ : selectedItems[id]--
  if (selectedItems[id] <= 0) {
    delete selectedItems[id]
  }
}

function formatCurrency(value: number, currency = 'USD'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    currency,
    style: 'currency',
    minimumFractionDigits: 2
  })
  return formatter.format(value)
}

const preview = computed(() => {
  const subtotal = Object.entries(selectedItems).reduce((res, [id, quantity]) => {
    res += (getInventoryItemById(id)?.price ?? 0) * quantity
    return res
  }, 0)
  const tax = subtotal * (taxRate.value / 100)
  return {
    subtotal,
    tax,
    total: subtotal + tax
  }
})
</script>

<style scoped>
.quantity-btn {
  @apply border border-focus-state h-6 w-6 text-lg rounded;
}
</style>
