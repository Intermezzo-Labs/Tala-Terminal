<template>
  <div class="flex justify-between py-4">
    <InputField label="Search" />
    <button
      type="button"
      class="py-2 px-4 border border-current rounded-full text-sm"
      @click="modalStore.openModal({ component: InventoryItemCreate, callback: createCallback })"
    >
      Create item
    </button>
  </div>
  <AppTable>
    <template #thead>
      <tr>
        <th>Name</th>
        <th>Categories</th>
        <th>Description</th>
        <th>Price</th>
        <th>Quantity</th>
        <th></th>
      </tr>
    </template>
    <template #tbody>
      <tr v-for="item in items" :key="item.id">
        <td>
          {{ item.name }}
        </td>
        <td>{{ item.categories?.map((cat) => cat.name).join(', ') }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.quantity }}</td>
        <td class="text-right space-x-2">
          <button
            type="button"
            @click="
              modalStore.openModal({
                component: InventoryItemCreate,
                props: { item },
                callback: createCallback
              })
            "
          >
            Edit
          </button>
          <button type="button" @click="handleDelete(item.id)">Delete</button>
        </td>
      </tr>
    </template>
    <template v-if="!items?.length" #tfoot>
      <tr>
        <td colspan="5"><p class="p-4 text-center">No items</p></td>
      </tr>
    </template>
  </AppTable>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppTable from './AppTable.vue'
import { useModalsStore } from '@renderer/stores/modals'
import { InventoryItem } from '@shared/models'
import InventoryItemCreate from '@renderer/components/InventoryItemCreate.vue'
import InputField from './InputField.vue'

const items = ref<InventoryItem[]>()

onMounted(() => fetchItems())

async function fetchItems(): Promise<void> {
  items.value = await window.api.inventory.getInventoryItems()
}

async function createCallback(): Promise<void> {
  await fetchItems()
  modalStore.clearModals()
}

async function handleDelete(id: InventoryItem['id']): Promise<void> {
  await window.api.inventory.deleteInventoryItem(id)
  await fetchItems()
}

const modalStore = useModalsStore()
</script>
