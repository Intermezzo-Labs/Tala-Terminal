<template>
  <div class="p-8 bg-white rounded space-y-4 text-center">
    <div>
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
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
import QRCode from 'qrcode'

const props = defineProps({
  charge: {
    type: Object as PropType<Charge>
  }
})

const imgSrc = ref()
if (props.charge?.hosted_url) {
  QRCode.toDataURL(props.charge?.hosted_url, (err, url) => {
    imgSrc.value = url
  })
}
</script>
