<template>
  <div class="bg-base-bg border-2 border-hover-state p-4 rounded-2xl space-y-4 max-w-xs">
    <h2>Create Item</h2>
    <form action="" @submit.prevent="handleSubmit">
      <fieldset class="space-y-2">
        <InputField v-model="form.name" label="Name" />
        <InputField v-model="form.description" label="Description" />
        <InputField v-model="form.price" type="number" min="0" step="0.01" label="Price" />
        <InputField v-model="form.quantity" type="number" min="0" label="Quantity" />
      </fieldset>
      <fieldset v-if="categories?.length" class="mt-4">
        <h5>Categories</h5>
        <div class="flex flex-wrap gap-1">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            :class="{ underline: isCategorySelected(cat) }"
            @click="toggleCategory(cat)"
          >
            <span
              class="inline-flex items-center justify-center rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700"
            >
              <p class="whitespace-nowrap text-sm">{{ cat.name }}</p>

              <button
                class="-me-1 ms-1.5 inline-block rounded-full bg-purple-200 p-0.5 text-purple-700 transition hover:text-purple-600"
              >
                <span class="sr-only">Remove badge</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-3 w-3"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          </button>
        </div>
      </fieldset>
      <fieldset>
        <div class="space-x-2 text-right mt-4">
          <button type="reset">Clear</button>
          <button>Save</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRaw } from 'vue'
import InputField from './InputField.vue'
import { InventoryItemInput, InventoryItem, InventoryCategory } from '@shared/models'

const emit = defineEmits(['close'])
const form: InventoryItemInput = reactive({
  name: '',
  description: '',
  quantity: 0,
  price: 0,
  categories: [],
  disabled: false
})

const categories = ref<InventoryCategory[]>()
function isCategorySelected(category: InventoryCategory): boolean {
  return form.categories?.includes(category) ?? false
}
function toggleCategory(category: InventoryCategory): void {
  if (isCategorySelected(category)) {
    form.categories = form.categories?.filter(({ id }) => id !== category.id)
  } else {
    form.categories?.push(category)
  }
}
onMounted(async () => {
  categories.value = await window.api.inventory.getInventoryCategories()
})

async function handleSubmit(): Promise<InventoryItem | void> {
  try {
    await window.api.inventory.createInventoryItem(toRaw(form))
    emit('close')
  } catch (error) {
    console.error(error)
  }
}
</script>
