<template>
  <div>
    <LoadingScreen v-if="loading" />
    <component :is="component" v-if="method" :checkout-preview="checkoutPreview" />
    <div v-else class="h-screen flex flex-col items-center justify-center gap-4">
      <div
        v-if="checkout?.status === CheckoutStatus.FAILED"
        class="bg-red-900/50 text-red-200 border border-red-900 py-2 px-4 text-xs rounded"
      >
        <p>Previous checkout method failed</p>
      </div>
      <h2>Select a checkout method</h2>
      <CheckoutMethods v-model="method" class="w-80" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Checkout, CheckoutMethod, CheckoutPreview, CheckoutStatus } from '@shared/models'
import CheckoutMethodCash from '@renderer/components/checkout/CheckoutMethodCash.vue'
import CheckoutMethodCreditCard from '@renderer/components/checkout/CheckoutMethodCreditCard.vue'
import CheckoutMethodEWallet from '@renderer/components/checkout/CheckoutMethodEWallet.vue'
import CheckoutMethods from '@renderer/components/checkout/CheckoutMethods.vue'
import LoadingScreen from '@renderer/components/LoadingScreen.vue'

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
const checkout = ref<Checkout | null>()
const checkoutPreview = ref<CheckoutPreview | null>()
onMounted(async () => {
  try {
    loading.value = true
    checkout.value = await window.api.checkout.getCheckout(route.query.checkoutId as string)
    checkoutPreview.value = await window.api.checkout.createCheckoutPreview(
      route.params.orderId as string
    )
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>
