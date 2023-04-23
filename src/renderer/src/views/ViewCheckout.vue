<template>
  <component :is="component" :order-id="$route.params.orderId" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { CheckoutMethod } from '@shared/models'
import CheckoutCash from '@renderer/components/checkout/CheckoutCash.vue'
import CheckoutCreditCard from '@renderer/components/checkout/CheckoutCreditCard.vue'
import CheckoutEWallet from '@renderer/components/checkout/CheckoutEWallet.vue'

const route = useRoute()
const component = computed(() => {
  switch (route.query.method) {
    case CheckoutMethod.CREDIT_CARD:
      return CheckoutCreditCard
    case CheckoutMethod.E_WALLET:
      return CheckoutEWallet
    case CheckoutMethod.CASH:
    default:
      return CheckoutCash
  }
})
</script>
