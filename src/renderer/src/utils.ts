import { InjectionKey, inject } from 'vue'

export function requireInjection<T>(key: InjectionKey<T>, defaultValue?: T): T {
  const resolved = inject(key, defaultValue)
  if (!resolved) {
    throw new Error(`${key} was not provided.`)
  }
  return resolved
}

export function formatCurrency(
  value: number | string | undefined,
  currency = 'USD'
): number | string | undefined {
  if (isNaN(Number(value))) return value
  const formatter = new Intl.NumberFormat('en-US', {
    currency,
    style: 'currency',
    minimumFractionDigits: 0
  })
  return formatter.format(Number(value))
}
