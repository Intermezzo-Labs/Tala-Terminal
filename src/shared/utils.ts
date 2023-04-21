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

  get subtotal(): number {
    return this.calculateSubtotal()
  }
  get tax(): number {
    const subtotal = this.calculateSubtotal()
    return subtotal * (this.taxRate / 100)
  }
  get total(): number {
    return this.subtotal + this.tax
  }
}
