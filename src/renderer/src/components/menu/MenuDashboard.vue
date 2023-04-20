<template>
  <div>{{ myValue }}</div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { myProvider } from './menuContext'

// Use the value provided by MyProvider
const myValue = inject(myProvider)
console.log(myValue)
</script>
