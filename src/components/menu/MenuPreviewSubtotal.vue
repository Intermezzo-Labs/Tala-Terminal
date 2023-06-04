<template>
  <div>
    <dl class="grid grid-cols-2 text-sm gap-y-2">
      <dt><h3>Subtotal</h3></dt>
      <dd class="text-right">{{ formatCurrency(preview.subtotal) }}</dd>
      <dt>
        <span class="text-sm font-normal">Tax {{ taxRate }}%</span>
      </dt>
      <dd class="text-right">{{ formatCurrency(preview.tax) }}</dd>
      <hr class="col-span-2 my-1 border-focus-state border-dashed" />
      <dt class="text-lg"><h3>Total</h3></dt>
      <dd class="text-right text-lg">{{ formatCurrency(preview.total) }}</dd>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { MENU_KEY } from '@/keys'
import { formatCurrency, requireInjection } from '@/utils'

const { taxRate, preview } = requireInjection(MENU_KEY)
</script>
