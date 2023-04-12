<template>
  <div :class="$attrs.class">
    <dl class="text-lg font-bold grid grid-cols-2">
      <dt><h3>Subtotal</h3></dt>
      <dd class="text-right">${{ order?.subtotal }}</dd>
      <dt><span class="text-sm font-normal">Disc</span></dt>
      <dd class="text-right">${{ order?.discount }}</dd>
      <dt><span class="text-sm font-normal">Tax</span></dt>
      <dd class="text-right">${{ order?.tax }}</dd>
      <hr class="col-span-2 my-2 border-current border" />
      <dt><h3>Total</h3></dt>
      <dd class="text-right">${{ order?.total }}</dd>
    </dl>
  </div>
</template>

<script lang="ts" setup>
import { Order } from 'interfaces/graphql.type'
import { PropType } from 'vue'

defineProps({
  order: Object as PropType<Order>
})
</script>
