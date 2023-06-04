<template>
  <AppTable>
    <template #thead>
      <tr>
        <th>ID</th>
        <th>Items</th>
        <th>Created</th>
        <th>Payment</th>
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
        <td>{{ getCheckoutMethod(order.checkout) }}</td>
        <td>
          <AppBadge v-if="order.checkout?.status">{{ order.checkout?.status }}</AppBadge>
        </td>
        <td class="text-right space-x-2">
          <RouterLink
            :to="{
              name: RouteName.Checkout,
              params: { orderId: order.id }
            }"
          >
            {{ order.checkout ? 'Receipt' : 'Checkout' }}
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
import { Order } from '@shared/models'
import { RouteName } from '@/router/routeNames'
import { checkoutMethods } from '@/utils'
import AppBadge from '../AppBadge.vue'

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

function getCheckoutMethod(checkout: Order['checkout']): string {
  return checkoutMethods.find((c) => c.value === checkout?.method)?.text ?? ''
}
</script>
