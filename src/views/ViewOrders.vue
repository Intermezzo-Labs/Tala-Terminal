<template>
  <AppPanel title="Orders" class="pr-8">
    <template #actions>
      <InputField label="Search" />
    </template>
    <OrdersList />
  </AppPanel>
</template>

<script setup lang="ts">
import AppPanel from '@/components/AppPanel.vue'
import InputField from '@/components/InputField.vue'
import OrdersList from '@/components/orders/OrdersList.vue'
</script>
