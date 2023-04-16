<template>
  <div>
    <section>
      <div class="p-4 md:px-8 md:py-16">
        <div class="mb-8">
          <h2>History</h2>
        </div>
        <LoadingScreen v-if="loading" />
        <div v-if="charges.length" class="overflow-x-auto">
          <table class="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th>Code</th>
                <th>Description</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              <tr v-for="charge in charges">
                <td>
                  <pre>{{ charge.code }}</pre>
                </td>
                <td>{{ charge.description }}</td>
                <td>
                  {{ formatTotal(charge) }}
                </td>
                <td>
                  <PaymentStatus :status="getLatestUpdate(charge.timeline).status" />
                </td>
                <td class="whitespace-nowrap">
                  {{ formatDate(getLatestUpdate(charge.timeline).time) }}
                </td>
                <td class="text-right">
                  <a
                    :href="charge.hosted_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="link"
                    >Details</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { format, isToday } from 'date-fns'
import PaymentStatus from '@renderer/components/PaymentStatus.vue'
import LoadingScreen from '@renderer/components/LoadingScreen.vue'

const { charges, loading } = useCharges()

function formatDate(dt: string) {
  const date = new Date(dt)
  if (isToday(date)) {
    return `Today, ${format(date, 'h:mm a')}`
  }
  return format(date, 'MMM d, yyyy, h:mm a')
}

function getLatestUpdate(timeline: Timeline[]) {
  return timeline[timeline.length - 1]
}

function formatTotal(charge: Charge) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: charge.pricing.local.currency ?? 'USD'
  }).format(parseFloat(charge.pricing?.local.amount ?? '0'))
}
</script>

<style scoped>
th {
  @apply px-4 py-2 text-left font-medium text-gray-900;
}
td {
  @apply px-4 py-2 text-gray-700;
}
</style>
