<template>
  <AppTable>
    <template #thead>
      <tr>
        <th>ID</th>
        <th>Items</th>
        <th>Date</th>
        <th></th>
      </tr>
    </template>
    <template #tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>
          {{ order.id }}
        </td>
        <td>{{ order.items?.map((cat) => cat.name).join(', ') }}</td>
        <td>{{ formatDate(order.datetime) }}</td>
        <td class="text-right space-x-2">
          <button type="button" @click="handleDelete(order.id)">Delete</button>
        </td>
      </tr>
    </template>
    <template v-if="!orders?.length" #tfoot>
      <tr>
        <td colspan="5"><p class="p-4 text-center">No orders</p></td>
      </tr>
    </template>
  </AppTable>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { format, isToday } from 'date-fns'
import { InventoryItem, Order } from '@shared/models'
import AppTable from '../AppTable.vue'

const orders = ref<Order[]>()

onMounted(() => fetchItems())

async function fetchItems(): Promise<void> {
  orders.value = await window.api.order.getOrders()
}

async function handleDelete(id: InventoryItem['id']): Promise<void> {
  console.log('delete', id)
}

function formatDate(dt: Date): string {
  if (isToday(dt)) {
    return `Today, ${format(dt, 'h:mm a')}`
  }
  return format(dt, 'MMM d, yyyy, h:mm a')
}
</script>
