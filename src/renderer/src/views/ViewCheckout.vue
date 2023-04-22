<template>
  <div>
    <h1>Checkout!</h1>
    <pre>{{ checkout }}</pre>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const checkout = ref()
onMounted(async () => {
  checkout.value = await window.api.checkout.createCheckoutPreview(route.params.orderId as string)
})
</script>
