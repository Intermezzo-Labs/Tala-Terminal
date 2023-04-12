import { defineStore } from 'pinia'
import { Component, markRaw } from 'vue'

interface State {
  modals: {
    id: string
    component: Component
    props?: Record<string, any>
  }[]
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
    openModal(component: Component, props?: Record<string, any>) {
      this.modals.push({
        id: Math.random().toString(),
        component: markRaw(component),
        props
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
