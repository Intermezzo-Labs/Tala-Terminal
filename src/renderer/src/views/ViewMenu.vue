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
          <div
            v-for="item in items"
            :key="item.id"
            type="button"
            class="bg-hover-state rounded flex flex-col justify-between text-left p-4 gap-2 h-36"
            @click="handleItemSelected(item.id)"
          >
            <p class="text-xs">Orders → Kitchen</p>
            <div class="flex-1">
              <h5 class="text-sm text-highlight">{{ item.name }}</h5>
              <p class="text-xs">${{ item.price }}</p>
            </div>
            <div class="flex justify-between gap-2 self-end">
              <div class="inline-flex items-center">
                <button type="button" class="quantity-btn">-</button>
                <span class="inline-block w-8 text-center">{{ 0 }}</span>
                <button type="button" class="quantity-btn">+</button>
              </div>
            </div>
          </div>
        </div>
      </AppPanel>
    </div>
    <div class="md:col-span-4 h-full overflow-hidden">
      <AppPanel
        title="Table 4"
        class="h-full space-y-4 md:space-y-0 md:flex flex-col justify-between"
      >
        <template #actions>
          <button v-if="hasSelectedItems" class="link" @click="handleOrderReset">Clear</button>
        </template>

        <div class="flex-1 md:overflow-auto">
          <div v-if="hasSelectedItems" class="space-y-1">
            <div
              v-for="(quantity, id) in selectedItems"
              :key="id"
              class="rounded p-3 flex text-sm bg-hover-state text-highlight"
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
          class="space-y-4 md:space-y-8 transition-all delay-200 ease-in bg-hover-state text-highlight p-3 rounded"
          :class="hasSelectedItems ? 'opacity-100' : 'md:opacity-0'"
        >
          <div>
            <dl class="grid grid-cols-2 text-sm gap-y-2">
              <dt><h3>Subtotal</h3></dt>
              <dd class="text-right">$0</dd>
              <dt><span class="text-sm font-normal">Tax 10%</span></dt>
              <dd class="text-right">$0</dd>
              <hr class="col-span-2 my-1 border-focus-state border-dashed" />
              <dt class="text-lg"><h3>Total</h3></dt>
              <dd class="text-right text-lg">$0</dd>
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
import { ref, computed, reactive, onMounted } from 'vue'
import { InventoryCategory, InventoryItem } from 'src/shared/models'
import AppPanel from 'components/AppPanel.vue'
import InputField from 'components/InputField.vue'

const loading = ref(false)

const items = ref<InventoryItem[]>([])
const selectedItems = reactive<{ [id: InventoryItem['id']]: number }>({})
const hasSelectedItems = computed(() => Object.keys(selectedItems).length)

const categories = ref<InventoryCategory[]>([])
// const selectedCategoryId = ref<InventoryCategory['id']>()

onMounted(async () => {
  try {
    loading.value = true
    items.value = await window.api.inventory.getInventoryItems()
    categories.value = await window.api.inventory.getInventoryCategories()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

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
  return items.value.find((item) => item.id === id)
}

// function handleQuantityUpdate(id: InventoryItem['id'], quantity: 1 | -1): void {
//   if (selectedItems[id]) {
//     selectedItems[id] += quantity
//   }
//   if (selectedItems[id] <= 0) {
//     delete selectedItems[id]
//   }
// }
</script>

<style scoped>
.quantity-btn {
  @apply border border-focus-state h-6 w-6 rounded;
}
</style>
