<template>
  <div>
    <component v-if="method" :is="component" :order-id="$route.params.orderId" />
    <div v-else class="h-screen flex flex-col items-center justify-center gap-4">
      <h2>Select a checkout method</h2>
      <CheckoutMethods v-model="method" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { CheckoutMethod } from '@shared/models'
import CheckoutCash from '@renderer/components/checkout/CheckoutCash.vue'
import CheckoutCreditCard from '@renderer/components/checkout/CheckoutCreditCard.vue'
import CheckoutEWallet from '@renderer/components/checkout/CheckoutEWallet.vue'
import CheckoutMethods from '@renderer/components/checkout/CheckoutMethods.vue'

const route = useRoute()
const method = ref<CheckoutMethod>(route.query?.method as CheckoutMethod)

const component = computed(() => {
  switch (method.value) {
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
