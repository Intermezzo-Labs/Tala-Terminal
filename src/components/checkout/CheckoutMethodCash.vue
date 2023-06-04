<template>
  <div class="grid grid-cols-2 gap-16 h-screen place-content-baseline items-center content-center">
    <div>
      <CheckoutCalculator v-model="paidAmount" />
      <div class="grid grid-cols-3 gap-1 py-4">
        <button v-for="n in quickOptions" :key="n" @click="paidAmount = String(n)">
          {{ formatCurrency(n) }}
        </button>
      </div>
    </div>
    <div class="space-y-8 w-64">
      <div class="text-xs">
        <h5>Order items</h5>
        <p class="italic">{{ items }}</p>
      </div>
      <dl class="grid grid-cols-2 gap-2">
        <dt>Total</dt>
        <dd>{{ formatCurrency(checkoutPreview?.amount) }}</dd>
        <dt class="text-4xl">Paid</dt>
        <dd class="text-4xl">{{ formatCurrency(paidAmount) }}</dd>
        <dt>Change</dt>
        <dd>
          <span v-if="changeAmount < 0" class="text-red-400">Insufficient amount</span>
          <span v-else class="text-highlight">{{ formatCurrency(changeAmount) }}</span>
        </dd>
      </dl>
      <button type="button" class="btn" :disabled="changeAmount < 0" @click="handleComplete">
        Complete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, reactive, ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { formatCurrency } from '@/utils'
import { CheckoutPreview, CheckoutInput, CheckoutMethod } from '@shared/models'
import CheckoutCalculator from '@/components/checkout/CheckoutCalculator.vue'
import { RouteName } from '@/router/routeNames'

const quickOptions = [20, 50, 100]

const props = defineProps({
  checkoutPreview: {
    type: Object as PropType<CheckoutPreview>,
    required: true,
    default: () => ({})
  }
})

const items = computed(() =>
  props.checkoutPreview?.order?.items
    ?.reduce((res, curr) => {
      res.push(`${curr.name} (x${curr.quantity})`)
      return res
    }, [] as string[])
    .join(', ')
)

const checkoutInput = reactive<CheckoutInput>({
  method: CheckoutMethod.CASH,
  orderId: props.checkoutPreview.order.id,
  customerId: ''
})

const paidAmount = ref<string>('0')
const changeAmount = computed(() => Number(paidAmount.value) - Number(props.checkoutPreview.amount))

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
