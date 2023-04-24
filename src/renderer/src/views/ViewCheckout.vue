<template>
  <div>
    <component :is="component" v-if="method" :checkout-preview="checkoutPreview" />
    <div v-else class="h-screen flex flex-col items-center justify-center gap-4">
      <h2>Select a checkout method</h2>
      <CheckoutMethods v-model="method" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { CheckoutMethod, CheckoutPreview } from '@shared/models'
import CheckoutMethodCash from '@renderer/components/checkout/CheckoutMethodCash.vue'
import CheckoutMethodCreditCard from '@renderer/components/checkout/CheckoutMethodCreditCard.vue'
import CheckoutMethodEWallet from '@renderer/components/checkout/CheckoutMethodEWallet.vue'
import CheckoutMethods from '@renderer/components/checkout/CheckoutMethods.vue'

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

const checkoutPreview = ref<CheckoutPreview | null>()
onMounted(async () => {
  checkoutPreview.value = await window.api.checkout.createCheckoutPreview(
    route.params.orderId as string
  )
})
</script>
