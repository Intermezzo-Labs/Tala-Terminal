<template>
  <div class="bg-white p-4 rounded-2xl space-y-4">
    <h2>Edit Item</h2>
    <form action="" @submit.prevent="handleSubmit">
      <fieldset class="space-y-2">
        <InputField v-model="form.name" label="Name" />
        <InputField v-model="form.description" label="Description" />
        <InputField v-model="form.price" type="number" min="0" step="0.01" label="Price" />
        <InputField v-model="form.quantity" type="number" min="0" label="Quantity" />
      </fieldset>
      <fieldset>
        <div class="space-x-2 text-right mt-4">
          <button type="button" @click="$emit('close')">Cancel</button>
          <button>Update</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import InputField from './InputField.vue'
import { InventoryItem } from '@shared/models'

const emit = defineEmits(['close'])

const props = defineProps({
  item: {
    type: Object as () => InventoryItem,
    default: () => ({}),
    required: true
  }
})

const form: InventoryItem = reactive({ ...props.item })

async function handleSubmit(): Promise<InventoryItem | void> {
  try {
    await window.api.inventory.updateInventoryItem({ ...form })
    emit('close')
  } catch (error) {
    console.error(error)
  }
}
</script>
