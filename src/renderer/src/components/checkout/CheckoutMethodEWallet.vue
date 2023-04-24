<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <AppIcon name="cool-face" class="h-12" />
    <h1>Coming soon</h1>
    <pre>{{ charge }}</pre>
  </div>
</template>

<script setup lang="ts">
import { CheckoutPreview } from '@shared/models'
import AppIcon from '../AppIcon.vue'
import { PropType, onMounted, ref } from 'vue'

const props = defineProps({
  checkoutPreview: {
    type: Object as PropType<CheckoutPreview>,
    required: true,
    default: () => ({})
  }
})

const loading = ref()
const charge = ref()
onMounted(async () => {
  try {
    loading.value = true
    charge.value = await window.api.checkout.createCoinbaseCharge(props.checkoutPreview.order.id)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>
