<template>
  <div class="bg-base-bg border-2 border-hover-state p-4 rounded-2xl space-y-8 max-w-xs">
    <h2>{{ title }}</h2>
    <form action="" @submit.prevent="handleSubmit">
      <fieldset class="space-y-2">
        <InputField v-model="form.name" required label="Name" />
        <InputField v-model="form.description" label="Description" />
        <div class="grid grid-cols-2 gap-2">
          <InputField
            v-model="form.price"
            type="number"
            min="0"
            step="0.01"
            required
            label="Price"
          />
          <InputField v-model="form.quantity" type="number" min="0" required label="Quantity" />
        </div>
      </fieldset>
      <fieldset v-if="categories?.length" class="mt-2">
        <h5 class="text-sm mb-1">Categories</h5>
        <div class="flex flex-wrap gap-1">
          <button
            v-for="category in categories"
            :key="category.id"
            type="button"
            @click="toggleCategory(category)"
          >
            <AppBadge :selected="isCategorySelected(category)">{{ category.name }}</AppBadge>
          </button>
        </div>
      </fieldset>
      <fieldset>
        <div class="flex gap-4 justify-end mt-8">
          <button type="button" class="mr-auto" @click="callback()">Cancel</button>
          <button v-if="!item.id" type="reset">Clear</button>
          <button>Save</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, onMounted, reactive, ref, toRaw } from 'vue'
import InputField from './InputField.vue'
import { InventoryItem, InventoryCategory } from '@shared/models'
import AppBadge from './AppBadge.vue'

const props = defineProps({
  callback: {
    type: Function,
    default: () => {}
  },
  item: {
    type: Object as PropType<InventoryItem>,
    default: () => ({}),
    required: false
  }
})

const form = reactive<InventoryItem>({
  id: '',
  name: '',
  description: '',
  quantity: 0,
  price: 0,
  categories: [],
  disabled: false
})
const title = computed(() => (props.item.id ? 'Edit Item' : 'Create Item'))

const categories = ref<InventoryCategory[]>()
function isCategorySelected(category: InventoryCategory): boolean {
  return form.categories?.some((cat) => cat.id === category.id) ?? false
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
  if (props.item.id) {
    form.id = props.item.id
    form.name = props.item.name
    form.description = props.item.description
    form.price = props.item.price
    form.quantity = props.item.quantity
    form.categories = props.item.categories
  }
})

async function handleSubmit(): Promise<InventoryItem | void> {
  try {
    const { id, ...data } = toRaw(form)
    id
      ? await window.api.inventory.updateInventoryItem({ id, ...data })
      : await window.api.inventory.createInventoryItem(data)
    props.callback()
  } catch (error) {
    console.error(error)
  }
}
</script>
