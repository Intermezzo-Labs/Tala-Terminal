<template>
  <span
    class="inline-flex items-center justify-center rounded-full px-2.5 py-0.5 font-medium"
    :class="selected ? 'bg-highlight text-base-bg' : 'bg-hover-state'"
  >
    <p class="whitespace-nowrap text-sm"><slot></slot></p>
    <!-- <button
    class="-me-1 ms-1.5 inline-block rounded-full bg-purple-200 p-0.5 text-purple-700 transition hover:text-purple-600"
  >
    <span class="sr-only">Remove badge</span>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="h-3 w-3"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button> -->
  </span>
</template>

<script setup lang="ts">
defineProps({
  selected: {
    type: Boolean,
    default: false,
    required: false
  }
})
</script>
