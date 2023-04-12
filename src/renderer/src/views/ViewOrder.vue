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
      <AppPanel>
        <template #actions>
          <InputField label="Search" />
        </template>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            v-for="n in 4"
            :key="n"
            type="button"
            class="bg-pink-100 rounded p-4 flex flex-col h-28 justify-between"
          >
            <div><span class="text-xs">icon</span></div>
            <div>
              <h4 class="font-semibold">Title</h4>
              <p class="text-xs text-pink-400">{{ n + 3 }} items</p>
            </div>
          </button>
        </div>
        <hr class="my-4" />
        <InventoryItemsGrid
          :items="inventoryItems"
          :loading="loadingInventoryItems"
          @item-selected="handleItemSelected"
        />
      </AppPanel>
    </div>
    <div class="md:col-span-4 bg-neutral-100 h-full overflow-hidden">
      <AppPanel
        title="Table 4"
        class="h-full space-y-4 md:space-y-0 md:flex flex-col justify-between"
      >
        <template #actions>
          <button v-if="hasSelectedItems" class="link" @click="handleOrderReset">Clear</button>
        </template>

        <div class="flex-1 md:overflow-auto">
          <div v-if="hasSelectedItems" class="space-y-2">
            <div
              v-for="(quantity, id) in selectedItems"
              :key="id"
              class="bg-white rounded-2xl p-4 flex text-sm"
            >
              <h4 class="flex-1">
                {{ getInventoryItemById(id as string)?.name }}
                <span class="text-slate-400">x{{ quantity }}</span>
              </h4>

              <p>${{ (getInventoryItemById(id as string)?.price ?? 0) * quantity }}</p>
            </div>
          </div>
          <span v-else>No items</span>
        </div>
        <div
          class="space-y-4 md:space-y-8 transition-all delay-200 ease-in"
          :class="hasSelectedItems ? 'opacity-100' : 'md:opacity-0'"
        >
          <div>
            <dl class="text-lg font-bold grid grid-cols-2">
              <dt><h3>Subtotal</h3></dt>
              <dd class="text-right">$0</dd>
              <dt><span class="text-sm font-normal">Disc</span></dt>
              <dd class="text-right">$0</dd>
              <dt><span class="text-sm font-normal">Tax</span></dt>
              <dd class="text-right">$0</dd>
              <hr class="col-span-2 my-2 border-current border" />
              <dt><h3>Total</h3></dt>
              <dd class="text-right">$0</dd>
            </dl>
          </div>
          <div :class="hasSelectedItems ? 'fixed inset-4 top-auto sm:static' : ''">
            <button type="button" class="btn" disabled>Place Order</button>
          </div>
        </div>
      </AppPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
// import InputField from 'components/InputField.vue'
// import InventoryCategoriesGrid from 'components/InventoryCategoriesGrid.vue'
import InventoryItemsGrid from 'components/InventoryItemsGrid.vue'
import { ref, computed, reactive, onMounted } from 'vue'
// import { useModalsStore } from '@renderer/stores/modals'
// import CoinbaseChargeInfo from 'components/CoinbaseChargeInfo.vue'
import { InventoryItem } from 'src/shared/models'
import AppPanel from '@renderer/components/AppPanel.vue'
import InputField from '@renderer/components/InputField.vue'

const inventoryItems = ref<InventoryItem[]>([])
const loadingInventoryItems = ref(false)

onMounted(async () => {
  try {
    loadingInventoryItems.value = true
    inventoryItems.value = await window.api.inventory.getInventoryItems()
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

const selectedItems = reactive<{ [id: InventoryItem['id']]: number }>({})
const hasSelectedItems = computed(() => Object.keys(selectedItems).length)

const handleItemSelected = (id: InventoryItem['id']): void => {
  if (!selectedItems[id]) {
    selectedItems[id] = 0
  }
  selectedItems[id]++
}

function handleOrderReset(): void {
  Object.keys(selectedItems).forEach((id) => delete selectedItems[id])
}

function getInventoryItemById(id: string): InventoryItem | undefined {
  return inventoryItems.value.find((item) => item.id === id)
}

// function handleQuantityUpdate(id: InventoryItem['id'], quantity: 1 | -1): void {
//   if (selectedItems[id]) {
//     selectedItems[id] += quantity
//   }
//   if (selectedItems[id] <= 0) {
//     delete selectedItems[id]
//   }
// }

// const modalsStore = useModalsStore()
// const { createCharge, loading: creatingCharge } = useCreateCharge()
// async function handlePayment(): Promise<void> {
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
