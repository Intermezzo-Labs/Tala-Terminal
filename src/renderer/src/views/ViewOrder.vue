<template>
  <div class="md:grid md:grid-cols-12 h-full">
    <div class="md:col-span-8 overflow-auto">
      <!-- <section>
        <div class="p-4 md:px-8 md:pt-16">
          <div class="flex justify-between gap-2">
            <h2>Choose Category</h2>
            <div>
              <InputField label="Search items" />
            </div>
          </div>
        </div>
        <InventoryCategoriesGrid
          class="flex-nowrap overflow-auto px-4 md:px-8 pb-8"
          :items="categories"
          :loading="loadingInventoryCategories"
          :selected-item-id="selectedCategoryId"
          @item-selected="selectedCategoryId = $event"
        />
      </section> -->
      <section class="p-4 md:px-8 md:pb-16">
        <div class="mb-8">
          <div>
            <!-- <h2>Select {{ selectedCategoryName }}</h2> -->
          </div>
        </div>
        <InventoryItemsGrid
          :items="items"
          :loading="loadingInventoryItems"
          @item-selected="handleItemSelected"
        />
      </section>
    </div>
    <div class="md:col-span-4 px-4 py-8 md:p-0 bg-neutral-100 h-full overflow-hidden">
      <!-- <div
        class="h-full space-y-4 md:space-y-0 md:flex flex-col justify-between transition-all delay-200 ease-out"
        :class="order?.items.length ? 'opacity-100' : 'md:opacity-0'"
      >
        <div class="md:pt-16 md:px-8 flex justify-between">
          <h2>Order List</h2>
          <div>
            <button v-if="orderInput.items.length" class="link" @click="handleOrderReset">
              Reset
            </button>
          </div>
        </div>

        <div class="flex-1 md:overflow-auto md:p-8 space-y-2 md:space-y-4" :class="$attrs.class">
          <template v-if="order?.items.length">
            <OrderItem
              v-for="orderItem in order?.items"
              :key="orderItem.details.id"
              :item="orderItem"
              @clicked:add-note="handleAddNote(orderItem.details.id)"
              @clicked:quantity="handleQuantity(orderItem.details.id, $event)"
            />
          </template>
          <span v-else>No items</span>
        </div>
        <div class="space-y-4 md:space-y-8 pb-16 md:px-8 md:py-4">
          <OrderTotal :order="order" :loading="calculatingOrder" />
          <div :class="order?.items.length ? 'fixed inset-4 top-auto sm:static' : ''">
            <button
              type="button"
              class="btn"
              :class="{ 'animate-pulse': creatingCharge }"
              :disabled="order?.items.length === 0 || creatingCharge"
              @click="handlePayment"
            >
              Pay with Coinbase
            </button>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
// import InputField from 'components/InputField.vue'
// import InventoryCategoriesGrid from 'components/InventoryCategoriesGrid.vue'
import InventoryItemsGrid from 'components/InventoryItemsGrid.vue'
import { ref, computed, reactive, onMounted } from 'vue'
// import OrderItem from 'components/OrderItem.vue'
// import OrderTotal from 'components/OrderTotal.vue'
// import { useModalsStore } from '@renderer/stores/modals'
// import CoinbaseChargeInfo from 'components/CoinbaseChargeInfo.vue'
import { InventoryItem } from 'src/shared/models'

const items = ref<InventoryItem[]>([])
const loadingInventoryItems = ref(false)

onMounted(async () => {
  try {
    loadingInventoryItems.value = true
    items.value = await window.api.inventory.getInventoryItems()
  } catch (error) {
    console.error(error)
  } finally {
    loadingInventoryItems.value = false
  }
})

// const categories = ref<InventoryItem[]>([])
// const selectedCategoryId = ref<InventoryCategory['id']>()
// onResult(({ data }) => (selectedCategoryId.value = data.inventoryCategories[0].id))
// const selectedCategoryName = computed<string>(
//   () => categories.value.find(({ id }) => id === selectedCategoryId.value)?.name ?? ''
// )

// const orderInput = reactive<OrderInput>({
//   items: []
// })
// const { order, loading: calculatingOrder } = useCalculateOrder(orderInput)

const handleItemSelected = (itemId: InventoryItem['id']): void => {
  const existingItem = orderInput.items?.find((item) => item.itemId === itemId)

  if (existingItem) {
    existingItem.quantity++
  } else {
    orderInput.items?.push({
      itemId,
      quantity: 1
    })
  }
}

// function handleOrderReset() {
//   orderInput.items = []
// }

// function handleAddNote(itemId: IOrderItem['details']['id']) {}

// function handleQuantity(itemId: IOrderItem['details']['id'], quantity: number) {
//   const existingItem = orderInput.items?.find((item) => item.itemId === itemId)
//   if (existingItem?.quantity) {
//     existingItem.quantity += quantity
//   }
//   if (existingItem?.quantity === 0) {
//     orderInput.items = orderInput.items?.filter((orderItem) => orderItem.itemId !== itemId)
//   }
// }

// const modalsStore = useModalsStore()
// const { createCharge, loading: creatingCharge } = useCreateCharge()
// async function handlePayment() {
//   try {
//     const charge = await createCharge({ items: orderInput.items })
//     if (charge) {
//       modalsStore.openModal(CoinbaseChargeInfo, {
//         charge
//       })
//       handleOrderReset()
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }
</script>
