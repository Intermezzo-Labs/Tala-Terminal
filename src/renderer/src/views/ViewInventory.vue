<template>
  <AppPanel title="Inventory">
    <template #actions>
      <button type="button" @click="modalStore.openModal(InventoryCreateItem)">Create item</button>
      <button type="button" @click="modalStore.openModal(InventoryCategoryCreate)">
        Create category
      </button>
    </template>
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
          <td class="text-right">
            <button type="button" @click="modalStore.openModal(InventoryItemEdit, { item })">
              Edit
            </button>
          </td>
        </tr>
      </template>
    </AppTable>
  </AppPanel>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useModalsStore } from '@renderer/stores/modals'
import AppTable from '@renderer/components/AppTable.vue'
import AppPanel from '@renderer/components/AppPanel.vue'
import InventoryCreateItem from '@renderer/components/InventoryCreateItem.vue'
import InventoryItemEdit from '@renderer/components/InventoryItemEdit.vue'
import InventoryCategoryCreate from '@renderer/components/InventoryCategoryCreate.vue'
import { InventoryItem } from '@shared/models'

const inventory = ref<InventoryItem[]>()

onMounted(async () => {
  inventory.value = await window.api.inventory.getInventoryItems()
})

const modalStore = useModalsStore()
</script>
