<template>
  <MenuProvider>
    <!-- <div>{{ myMessage }}</div> -->
    <MenuDashboard />
  </MenuProvider>
</template>

<script setup lang="ts">
import MenuProvider from '../components/menu/MenuProvider.vue'
import MenuDashboard from '@renderer/components/menu/MenuDashboard.vue'
</script>
