<template>
  <div class="flex justify-between py-4">
    <InputField label="Search" />
    <button
      type="button"
      class="py-2 px-4 border border-current rounded-full text-sm"
      @click="
        modalStore.openModal({ component: InventoryCategoryCreate, callback: createCallback })
      "
    >
      Create category
    </button>
  </div>
  <AppTable>
    <template #thead>
      <tr>
        <th>Name</th>
        <th>Items</th>
        <th></th>
      </tr>
    </template>
    <template #tbody>
      <tr v-for="category in categories" :key="category.id">
        <td>
          {{ category.name }}
        </td>
        <td>{{ category.items?.length }}</td>
        <td class="text-right space-x-2">
          <button
            type="button"
            @click="
              modalStore.openModal({ component: InventoryCategoryCreate, props: { category } })
            "
          >
            Edit
          </button>
          <button type="button" @click="handleDelete(category.id)">Delete</button>
        </td>
      </tr>
    </template>
    <template v-if="!categories?.length" #tfoot>
      <tr>
        <td colspan="5"><p class="p-4 text-center">No categories</p></td>
      </tr>
    </template>
  </AppTable>
</template>

<script setup lang="ts">
import AppTable from './AppTable.vue'
import { onMounted, ref } from 'vue'
import { useModalsStore } from '@renderer/stores/modals'
import { InventoryCategory } from '@shared/models'
import InventoryCategoryCreate from '@renderer/components/InventoryCategoryCreate.vue'
import InputField from './InputField.vue'

const categories = ref<InventoryCategory[]>()

onMounted(() => fetchCategories())

async function fetchCategories(): Promise<void> {
  categories.value = await window.api.inventory.getInventoryCategories()
}

async function createCallback(): Promise<void> {
  await fetchCategories()
  modalStore.clearModals()
}
async function handleDelete(id: InventoryCategory['id']): Promise<void> {
  await window.api.inventory.deleteInventoryCategory(id)
  await fetchCategories()
}

const modalStore = useModalsStore()
</script>
