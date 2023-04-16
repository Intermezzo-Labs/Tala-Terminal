import InputField from './InputField.vue';

<template>
  <div class="bg-white p-4 rounded-2xl space-y-4">
    <h2>Create Category</h2>
    <form action="" @submit.prevent="handleSubmit">
      <fieldset class="space-y-2">
        <InputField v-model="form.name" label="Name" />
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
import { InventoryCategory, InventoryCategoryInput } from '@shared/models'

const form: InventoryCategoryInput = reactive({
  name: ''
})

async function handleSubmit(): Promise<InventoryCategory | void> {
  try {
    await window.api.inventory.createInventoryCategory({ ...form })
  } catch (error) {
    console.error(error)
  }
}
</script>
