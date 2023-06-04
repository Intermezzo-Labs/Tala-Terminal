type CalculateItemTuple = [price: number, quantity: number]

export class CalculateOrder {
  items: CalculateItemTuple[] = []
  taxRate = 0

  constructor(items: CalculateItemTuple[], taxRate = 0) {
    this.items = items
    this.taxRate = taxRate
  }

  private calculateSubtotal(): number {
    return this.items.reduce((res, [price, quantity]) => {
      res += price * quantity
      return res
    }, 0)
  }

  private roundUp(value: number): number {
    return Math.ceil(value * 100) / 100
  }

  get subtotal(): number {
    const subtotal = this.calculateSubtotal()
    return this.roundUp(subtotal)
  }

  get tax(): number {
    const subtotal = this.calculateSubtotal()
    const tax = subtotal * (this.taxRate / 100)
    return this.roundUp(tax)
  }

  get total(): number {
    const subtotal = this.calculateSubtotal()
    const tax = subtotal * (this.taxRate / 100)
    const total = subtotal + tax
    return Math.round(this.roundUp(total) * 100) / 100
  }
}
