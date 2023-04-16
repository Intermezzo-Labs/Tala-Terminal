import InputField from './InputField.vue';

<template>
  <div class="bg-white p-4 rounded-2xl space-y-4">
    <h2>Create Item</h2>
    <form action="" @submit.prevent="handleSubmit">
      <fieldset class="space-y-2">
        <InputField v-model="form.name" label="Name" />
        <InputField v-model="form.description" label="Description" />
        <InputField v-model="form.price" type="number" min="0" step="0.01" label="Price" />
        <InputField v-model="form.quantity" type="number" min="0" label="Quantity" />
      </fieldset>
      <fieldset>
        <h5>Categories</h5>
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          :class="{ underline: isCategorySelected(cat) }"
          @click="toggleCategory(cat)"
        >
          {{ cat.name }}
        </button>
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
  } catch (error) {
    console.error(error)
  }
}
</script>
