<template>
  <div class="flex justify-between py-4">
    <InputField label="Search" />
    <button
      type="button"
      class="py-2 px-4 border border-current rounded-full text-sm"
      @click="modalStore.openModal({ component: InventoryCreateItem, callback: createCallback })"
    >
      Create item
    </button>
  </div>
  <AppTable>
    <template #thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Quantity</th>
        <th></th>
      </tr>
    </template>
    <template #tbody>
      <tr v-for="item in inventory" :key="item.id">
        <td>
          {{ item.name }}
        </td>
        <td>{{ item.description }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.quantity }}</td>
        <td class="text-right space-x-2">
          <button
            type="button"
            @click="modalStore.openModal({ component: InventoryItemEdit, props: { item } })"
          >
            Edit
          </button>
          <button
            type="button"
            @click="modalStore.openModal({ component: InventoryItemEdit, props: { item } })"
          >
            Delete
          </button>
        </td>
      </tr>
    </template>
    <template v-if="!inventory?.length" #tfoot>
      <tr>
        <td colspan="5"><p class="p-4 text-center">No items</p></td>
      </tr>
    </template>
  </AppTable>
</template>

<script setup lang="ts">
import AppTable from './AppTable.vue'
import { onMounted, ref } from 'vue'
import { useModalsStore } from '@renderer/stores/modals'
import { InventoryItem } from '@shared/models'
import InventoryCreateItem from '@renderer/components/InventoryCreateItem.vue'
import InventoryItemEdit from '@renderer/components/InventoryItemEdit.vue'
import InputField from './InputField.vue'

const inventory = ref<InventoryItem[]>()

onMounted(() => fetchItems())

async function fetchItems(): Promise<void> {
  inventory.value = await window.api.inventory.getInventoryItems()
}

async function createCallback(): Promise<void> {
  await fetchItems()
  modalStore.clearModals()
}

const modalStore = useModalsStore()
</script>
