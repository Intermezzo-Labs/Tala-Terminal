<template>
  <ul class="text-xs space-y-2 font-mono">
    <li>Electron v{{ versions.electron }}</li>
    <li>Chromium v{{ versions.chrome }}</li>
    <li>Node v{{ versions.node }}</li>
    <li>V8 v{{ versions.v8 }}</li>
  </ul>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const versions = reactive({ ...window.electron.process.versions })
</script>
