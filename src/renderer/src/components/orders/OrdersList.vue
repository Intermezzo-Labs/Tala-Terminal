<template>
  <AppTable>
    <template #thead>
      <tr>
        <th>ID</th>
        <th>Items</th>
        <th>Created</th>
        <th>Status</th>
        <th></th>
      </tr>
    </template>
    <template v-if="orders?.length" #tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>
          {{ order.id }}
        </td>
        <td>{{ order.items?.map((cat) => cat.name).join(', ') }}</td>
        <td>{{ formatDate(order.datetime) }}</td>
        <td>{{ getStatus(order.checkout) }}</td>
        <td class="text-right space-x-2">
          <RouterLink
            v-if="!order.checkout"
            :to="{ name: RouteName.Checkout, params: { orderId: order.id } }"
          >
            Checkout
          </RouterLink>
        </td>
      </tr>
    </template>
    <template v-else #tfoot>
      <tr>
        <td colspan="5"><p class="p-4 text-center">No orders</p></td>
      </tr>
    </template>
  </AppTable>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppTable from '../AppTable.vue'
import { format, isToday } from 'date-fns'
import { CheckoutMethod, Order } from '@shared/models'
import { RouteName } from '@renderer/router/routeNames'

const orders = ref<Order[]>()

onMounted(() => fetchItems())

async function fetchItems(): Promise<void> {
  orders.value = await window.api.order.getOrders()
}

function formatDate(dt: Date): string {
  if (isToday(dt)) {
    return `Today, ${format(dt, 'h:mm a')}`
  }
  return format(dt, 'MMM d, yyyy, h:mm a')
}

enum OrderStatus {
  UNPAID = 'Unpaid',
  PAID = 'Paid'
}
function getStatus(checkout: Order['checkout']): OrderStatus {
  switch (checkout?.method) {
    case CheckoutMethod.CASH:
      return OrderStatus.PAID
    default:
      return OrderStatus.UNPAID
  }
}
</script>
