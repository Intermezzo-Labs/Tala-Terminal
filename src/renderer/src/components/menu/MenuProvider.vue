<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, reactive, ref, toRaw } from 'vue'
import { MENU_KEY } from '@renderer/keys'
import { MenuContextInterface } from '@renderer/types'
import { CheckoutMethod, InventoryCategory, InventoryItem } from '@shared/models'
import { CalculateOrder } from '@shared/utils'
import { useRouter } from 'vue-router'
import { RouteName } from '@renderer/router/routeNames'

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
  const itemsWithPrices = Object.entries(selectedItems).reduce((res, [id, quantity]) => {
    const price = getInventoryItemById(id)?.price ?? 0
    res.push([price, quantity])
    return res
  }, [] as [number, number][])
  const { subtotal, tax, total } = new CalculateOrder(
    itemsWithPrices,
    parseFloat(taxRate.value ?? '0')
  )
  return {
    subtotal,
    tax,
    total
  }
})

const checkoutMethods = [
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
const selectedCheckoutMethod = ref<CheckoutMethod>()

function handleOrderReset(): void {
  Object.keys(selectedItems).forEach((id) => delete selectedItems[id])
}

const router = useRouter()
async function handlePlaceOrder(): Promise<void> {
  const order = await window.api.order.createOrder(toRaw(selectedItems))
  router.push({
    name: RouteName.Checkout,
    params: {
      orderId: order.id
    },
    query: {
      method: selectedCheckoutMethod.value
    }
  })
}

onMounted(async () => {
  try {
    loading.value = true
    const settings = await window.api.settings.getSettings()
    taxRate.value = settings.find((s) => s.key === 'taxRate')?.value ?? ''
    categories.value = await window.api.inventory.getInventoryCategories({
      withItems: true
    })
    selectedCategory.value = categories.value[0].id
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
  checkoutMethods,
  selectedCheckoutMethod,
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
