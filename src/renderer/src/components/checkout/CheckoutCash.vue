<template>
  <div
    class="grid grid-cols-2 gap-16 h-screen max-w-fit mx-auto place-content-baseline items-center content-center"
  >
    <div>
      <CheckoutCalculator v-model="paidAmount" class="w-80" />
      <div class="grid grid-cols-3 gap-1 py-4">
        <button v-for="n in quickOptions" :key="n" @click="paidAmount = String(n)">
          {{ formatCurrency(n) }}
        </button>
      </div>
    </div>
    <div>
      <dl class="grid grid-cols-2 gap-2 mb-8">
        <dt>Order</dt>
        <dd>{{ items }}</dd>
        <dt>Total</dt>
        <dd>{{ formatCurrency(checkoutData?.amount) }}</dd>
        <dt class="text-4xl">Paid</dt>
        <dd class="text-4xl">{{ formatCurrency(paidAmount) }}</dd>
        <dt v-show="Number(paidAmount)">Change</dt>
        <dd v-show="Number(paidAmount)" class="text-highlight">
          {{ formatCurrency(changeAmount) }}
        </dd>
      </dl>
      <button type="button" class="btn" :disabled="changeAmount < 0" @click="handleComplete">
        Complete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckoutCalculator from '@renderer/components/checkout/CheckoutCalculator.vue'
import { RouteName } from '@renderer/router/routeNames'
import { formatCurrency } from '@renderer/utils'
import { CheckoutPreview, CheckoutInput, CheckoutMethod } from '@shared/models'
import { computed, onMounted, reactive, ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'

const quickOptions = [20, 50, 100]

const props = defineProps({
  orderId: {
    type: String,
    required: true,
    default: ''
  }
})

const checkoutData = ref<CheckoutPreview | null>()
onMounted(async () => {
  checkoutData.value = await window.api.checkout.createCheckoutPreview(props.orderId)
})
const items = computed(() =>
  checkoutData.value?.order?.items
    ?.reduce((res, curr) => {
      res.push(`${curr.name} (x${curr.quantity})`)
      return res
    }, [] as string[])
    .join(', ')
)

const checkoutInput = reactive<CheckoutInput>({
  method: CheckoutMethod.CASH,
  orderId: props.orderId,
  customerId: ''
})

const paidAmount = ref<string>('0')
const changeAmount = computed(() => Number(paidAmount.value) - Number(checkoutData.value?.amount))

const router = useRouter()
async function handleComplete(): Promise<void> {
  try {
    await window.api.checkout.createCheckout(toRaw(checkoutInput))
    router.push({ name: RouteName.Menu })
  } catch (error) {
    console.error(error)
  }
}
</script>
