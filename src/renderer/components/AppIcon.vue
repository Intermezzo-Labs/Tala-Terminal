<template>
  <component :is="icon" class="fill-current"></component>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: '',
    required: true
  }
})

const icon = defineAsyncComponent(() => import(`../assets/svg/${props.name}.svg`))
</script>
