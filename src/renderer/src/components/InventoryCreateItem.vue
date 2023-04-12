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
        <div class="space-x-2 text-right mt-4">
          <button type="reset">Clear</button>
          <button>Save</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import InputField from './InputField.vue'
import { NewInventoryItem } from '@shared/models'
import { InventoryItem } from '@shared/models'

const form: NewInventoryItem = reactive({
  name: '',
  description: '',
  quantity: 0,
  price: 0
})

async function handleSubmit(): Promise<InventoryItem | void> {
  try {
    console.log('...sending')
    const response = await window.api.inventory.createInventoryItem({ ...form })
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}
</script>
