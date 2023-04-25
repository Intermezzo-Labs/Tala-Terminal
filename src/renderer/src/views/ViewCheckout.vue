<template>
  <div class="flex flex-col items-center justify-center h-full">
    <LoadingScreen v-if="loading" />
    <div v-else>
      <div v-if="order?.checkout" class="text-center space-y-8 mx-auto w-80">
        <div class="space-y-1">
          <AppIcon :name="getCheckoutIcon" class="h-12 w-full fill-teal-400" />
          <AppBadge>{{ order.checkout.status ?? 'Unknown' }}</AppBadge>
          <p class="text-4xl text-highlight">{{ formatCurrency(order.checkout.amount) }}</p>
          <p class="text-sm">{{ getCheckoutMethod }} payment</p>
        </div>
        <div class="space-y-2">
          <button class="btn" disabled>Print</button>
          <button
            class="btn"
            :disabled="order.checkout.status === CheckoutStatus.PENDING"
            @click="handleCancel"
          >
            Cancel
          </button>
        </div>
      </div>
      <div v-else>
        <component
          :is="component"
          v-if="method && checkoutPreview"
          :checkout-preview="checkoutPreview"
        />
        <div v-else class="h-screen flex flex-col items-center justify-center gap-4">
          <h2>Select a checkout method</h2>
          <CheckoutMethods v-model="method" class="w-80" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { CheckoutMethod, CheckoutPreview, CheckoutStatus, Order } from '@shared/models'
import CheckoutMethodCash from '@renderer/components/checkout/CheckoutMethodCash.vue'
import CheckoutMethodCreditCard from '@renderer/components/checkout/CheckoutMethodCreditCard.vue'
import CheckoutMethodEWallet from '@renderer/components/checkout/CheckoutMethodEWallet.vue'
import CheckoutMethods from '@renderer/components/checkout/CheckoutMethods.vue'
import LoadingScreen from '@renderer/components/LoadingScreen.vue'
import AppIcon from '@renderer/components/AppIcon.vue'
import { formatCurrency, checkoutMethods } from '@renderer/utils'
import AppBadge from '@renderer/components/AppBadge.vue'

const route = useRoute()
const method = ref<CheckoutMethod>(route.query?.method as CheckoutMethod)

const component = computed(() => {
  switch (method.value) {
    case CheckoutMethod.CREDIT_CARD:
      return CheckoutMethodCreditCard
    case CheckoutMethod.E_WALLET:
      return CheckoutMethodEWallet
    case CheckoutMethod.CASH:
    default:
      return CheckoutMethodCash
  }
})

const loading = ref()
const order = ref<Order | null>()
const checkoutPreview = ref<CheckoutPreview | null>()
onMounted(async () => await initCheckout())

async function initCheckout(): Promise<void> {
  try {
    loading.value = true
    order.value = await window.api.order.getOrder(route.params.orderId as string)
    if (!order.value?.checkout) {
      checkoutPreview.value = await window.api.checkout.createCheckoutPreview(
        route.params.orderId as string
      )
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const getCheckoutMethod = computed(
  () => checkoutMethods.find((c) => c.value === order.value?.checkout?.method)?.text ?? 'Unknown'
)
const getCheckoutIcon = computed(() => {
  switch (order.value?.checkout?.status) {
    case CheckoutStatus.PAID:
      return 'check'
    case CheckoutStatus.PENDING:
      return 'cool-face'
    case CheckoutStatus.FAILED:
      return 'pile-of-poo'
    default:
      return 'neutral-face'
  }
})

async function handleCancel(): Promise<void> {
  if (!order.value?.checkout?.id) return
  await window.api.checkout.deleteCheckout(order.value.checkout.id)
  await initCheckout()
}
</script>
