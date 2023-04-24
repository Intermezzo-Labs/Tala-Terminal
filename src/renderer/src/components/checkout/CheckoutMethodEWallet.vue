<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="p-8 bg-white rounded space-y-4 text-center">
      <div v-if="imgSrc">
        <figure>
          <picture><img :src="imgSrc" alt="QR code" class="mx-auto" /></picture>
        </figure>
      </div>
      <div>
        <a :href="charge?.hosted_url" class="link" target="_blank" rel="noopener noreferrer"
          >Open Coinbase Checkout</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, onMounted, ref } from 'vue'
import QRCode from 'qrcode'
import { CheckoutPreview } from '@shared/models'

const props = defineProps({
  checkoutPreview: {
    type: Object as PropType<CheckoutPreview>,
    required: true,
    default: () => ({})
  }
})

const loading = ref()
const charge = ref()
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
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>
