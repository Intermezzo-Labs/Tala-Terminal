<template>
  <slot></slot>
</template>
<script setup lang="ts">
import { MENU_KEY } from '@renderer/keys'
import { PaymentMethod } from '@renderer/types'
import { MenuContextInterface } from '@renderer/types'
import { InventoryCategory, InventoryItem } from '@shared/models'
import { computed, onMounted, provide, reactive, ref } from 'vue'

const loading = ref(false)
const taxRate = ref<string>()
const categories = ref<InventoryCategory[]>([])
const selectedCategory = ref<InventoryCategory['id']>()
const selectedItems = reactive<MenuContextInterface['selectedItems']>({})
const hasSelectedItems = computed(() => !!Object.keys(selectedItems).length)

function isItemSelected(id: InventoryItem['id']): boolean {
  return Object.keys(selectedItems).includes(id)
}
function getSelectedItemIndexById(id: InventoryItem['id']): number {
  return Object.keys(selectedItems).findIndex((selectedId) => selectedId === id) + 1
}

function handleOrderReset(): void {
  Object.keys(selectedItems).forEach((id) => delete selectedItems[id])
}

const items = computed(() => categories.value.map((c) => c.items).flat())
function getInventoryItemById(id: string): InventoryItem | undefined {
  return items.value.find((item) => item?.id === id)
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

const preview = computed(() => {
  const subtotal = Object.entries(selectedItems).reduce((res, [id, quantity]) => {
    res += (getInventoryItemById(id)?.price ?? 0) * quantity
    return res
  }, 0)
  const tax = subtotal * (parseFloat(taxRate.value ?? '0') / 100)
  return {
    subtotal,
    tax,
    total: subtotal + tax
  }
})

const paymentMethods = [
  {
    text: 'Cash',
    value: PaymentMethod.CASH,
    icon: 'cash'
  },
  {
    text: 'Credit Card',
    value: PaymentMethod.DEBIT_CARD,
    icon: 'credit-card'
  },
  {
    text: 'E-Wallet',
    value: PaymentMethod.E_WALLET,
    icon: 'qr-code'
  }
]
const selectedPaymentMethod = ref<PaymentMethod>()
function handlePlaceOrder(): void {
  switch (selectedPaymentMethod.value) {
    case PaymentMethod.DEBIT_CARD:
      return
    case PaymentMethod.E_WALLET:
      return
    case PaymentMethod.CASH:
    default:
      console.log('cash payment', preview.value)
  }
}

onMounted(async () => {
  try {
    loading.value = true
    const settings = await window.api.settings.getSettings()
    taxRate.value = settings.find((s) => s.key === 'taxRate')?.value ?? ''
    categories.value = await window.api.inventory.getInventoryCategories({
      withItems: true
    })
    // selectedCategory.value = context.categories[0].id
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

const context: MenuContextInterface = {
  loading,
  taxRate,
  categories,
  selectedCategory,
  selectedItems,
  hasSelectedItems,
  paymentMethods,
  selectedPaymentMethod,
  preview,
  isItemSelected,
  getInventoryItemById,
  getSelectedItemIndexById,
  handleQuantityUpdate,
  handleOrderReset,
  handlePlaceOrder
}

provide(MENU_KEY, context)
</script>
