<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <LoadingScreen v-if="loading" />
    <div v-else-if="charge" class="space-y-4 text-center">
      <div v-if="imgSrc" class="p-8 bg-white rounded">
        <figure>
          <picture><img :src="imgSrc" alt="QR code" class="mx-auto" /></picture>
        </figure>
      </div>
      <div>
        <a :href="charge?.hosted_url" class="link" target="_blank" rel="noopener noreferrer">
          Open Coinbase Checkout
        </a>
      </div>
      <p>{{ status }}</p>
      <RouterLink :to="{ name: RouteName.Menu }" class="btn">Done</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, onMounted, ref } from 'vue'
import QRCode from 'qrcode'
import { formatDistanceToNow, isPast, format } from 'date-fns'
import { CheckoutPreview, CoinbaseChargeResponse } from '@shared/models'
import LoadingScreen from '../LoadingScreen.vue'
import { CheckoutMethod } from '@shared/models'
import { RouteName } from '@/router/routeNames'

const props = defineProps({
  checkoutPreview: {
    type: Object as PropType<CheckoutPreview>,
    required: true,
    default: () => ({})
  }
})

const loading = ref()
const charge = ref<CoinbaseChargeResponse>()
const imgSrc = ref()
onMounted(async () => {
  try {
    loading.value = true
    charge.value = await window.api.checkout.createCoinbaseCharge(props.checkoutPreview.order.id)
    if (charge.value?.hosted_url) {
      QRCode.toDataURL(charge.value?.hosted_url, (err, url) => {
        if (err) throw err
        imgSrc.value = url
      })
    }
    await window.api.checkout.createCheckout({
      method: CheckoutMethod.E_WALLET,
      orderId: props.checkoutPreview.order.id,
      refId: charge.value.code,
      customerId: ''
    })
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

const status = computed(() => {
  if (charge.value?.confirmed_at) {
    const dt = new Date(charge.value?.confirmed_at)
    return `Payment confirmed ${format(dt, 'MMM d, yyyy, h:mm a')}`
  }
  if (charge.value?.expires_at) {
    const dt = new Date(charge.value.expires_at)
    const prefix = isPast(dt) ? 'Expired' : 'Expires'
    return `${prefix} ${formatDistanceToNow(dt, { addSuffix: true })}`
  }
  return 'Unknown status'
})
</script>
