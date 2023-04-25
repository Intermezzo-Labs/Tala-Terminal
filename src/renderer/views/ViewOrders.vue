<template>
  <AppPanel title="Orders" class="pr-8">
    <template #actions>
      <InputField label="Search" />
    </template>
    <OrdersList />
  </AppPanel>
</template>

<script setup lang="ts">
import AppPanel from '@renderer/components/AppPanel.vue'
import InputField from '@renderer/components/InputField.vue'
import OrdersList from '@renderer/components/orders/OrdersList.vue'
</script>
