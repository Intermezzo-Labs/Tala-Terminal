import { Ref, ref } from 'vue'

export function useProviderValidation<T>(value: T): { isProvided: Ref<boolean> } {
  const isProvided = ref(false)

  if (value !== undefined && value !== null) {
    isProvided.value = true
  } else {
    throw new Error(`A value must be provided for this provider.`)
  }

  return {
    isProvided
  }
}
