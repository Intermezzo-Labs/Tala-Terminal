import { defineStore } from 'pinia'
import { Component, markRaw } from 'vue'

interface Modal {
  id: string
  component: Component
  props?: Record<string, unknown>
  callback?: () => void
}
type ModalInput = Omit<Modal, 'id'>

interface State {
  modals: Modal[]
}

export const useModalsStore = defineStore({
  id: 'modals',
  state: (): State => ({
    modals: []
  }),
  getters: {
    hasModals: (state) => state.modals.length > 0
  },
  actions: {
    openModal({ component, props, callback }: ModalInput) {
      this.modals.push({
        id: Math.random().toString(),
        component: markRaw(component),
        props,
        callback
      })
    },
    closeModal(id: string) {
      this.modals = this.modals.filter((m) => m.id !== id)
    },
    clearModals() {
      this.modals = []
    }
  }
})
