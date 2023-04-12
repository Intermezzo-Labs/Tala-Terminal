<template>
  <div
    class="lg:h-screen lg:w-screen bg-black text-white lg:flex"
    :class="{ 'overflow-hidden w-screen h-screen': modalStore.hasModals }"
  >
    <AppHeader class="p-4 lg:p-8 lg:pr-0 lg:w-56" />
    <main class="flex-1 lg:p-8">
      <div class="bg-white text-black h-full overflow-auto rounded-t-3xl lg:rounded-b-3xl">
        <RouterView />
      </div>
    </main>
  </div>
  <AppModals />
</template>

<script setup lang="ts">
import AppHeader from 'components/AppHeader.vue'
import AppModals from 'components/AppModals.vue'
import { useModalsStore } from '@renderer/stores/modals'

const modalStore = useModalsStore()

// async function addTodo(): Promise<void> {
//   // const text = prompt('Enter todo text:')
//   todos.value = await window.api.addTodo({ title: 'cool guy', completed: false })
// }

// async function deleteTodo(todo): Promise<void> {
//   todos.value = await window.api.deleteTodo(todo.id)
// }
</script>
