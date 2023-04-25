import { AppDataSource } from '../db/data-source'
import {
  CheckoutSchema,
  InventoryCategorySchema,
  InventoryItemSchema,
  OrderSchema,
  SettingSchema
} from '../db/entities'
import {
  Checkout,
  CheckoutInput,
  CheckoutMethod,
  CheckoutPreview,
  CheckoutStatus,
  InventoryCategory,
  InventoryCategoryInput,
  InventoryItem,
  InventoryItemInput,
  Order,
  OrderItem,
  Setting,
  SettingKey
} from '../shared/models'
import { FindManyOptions, In } from 'typeorm'
import { CalculateOrder } from '../shared/utils'

export interface GetAllInventoryCategoriesOptions {
  withItems?: boolean
}

export class DatabaseService {
  private settingsRepository = AppDataSource.getRepository(SettingSchema)
  private inventoryItemRepository = AppDataSource.getRepository(InventoryItemSchema)
  private inventoryCategoryRepository = AppDataSource.getRepository(InventoryCategorySchema)
  private orderRepository = AppDataSource.getRepository(OrderSchema)
  private checkoutRepository = AppDataSource.getRepository(CheckoutSchema)

  async getAllInventoryItems(): Promise<InventoryItem[]> {
    return this.inventoryItemRepository.find({ relations: ['categories'] })
  }
  async createInventoryItem(item: InventoryItemInput): Promise<InventoryItem> {
    return this.inventoryItemRepository.save(item)
  }
  async updateInventoryItem(data: InventoryItem): Promise<InventoryItem | null> {
    const categories = await this.inventoryCategoryRepository.findBy({
      id: In(data.categories?.map((cat) => cat.id) ?? [])
    })
    const item = await this.inventoryItemRepository.findOneBy({ id: data.id })
    if (!item) {
      throw new Error(`Inventory item with ID ${data.id} not found`)
    }
    item.categories = categories
    Object.assign(item, data)
    return this.inventoryItemRepository.save(item)
  }
  async deleteInventoryItem(id: InventoryItem['id']): Promise<void> {
    await this.inventoryItemRepository.delete(id)
    return
  }

  async getAllInventoryCategories(
    opt?: GetAllInventoryCategoriesOptions
  ): Promise<InventoryCategory[]> {
    const options: FindManyOptions<InventoryCategory> | undefined = {}
    if (opt?.withItems) {
      options.relations = ['items']
    }
    return this.inventoryCategoryRepository.find(options)
  }
  async createInventoryCategory(category: InventoryCategoryInput): Promise<InventoryCategory> {
    return this.inventoryCategoryRepository.save(category)
  }
  async updateInventoryCategory({
    id,
    ...rest
  }: InventoryCategory): Promise<InventoryCategory | null> {
    await this.inventoryCategoryRepository.update({ id }, rest)
    return this.inventoryCategoryRepository.findOneBy({ id })
  }
  async deleteInventoryCategory(id: InventoryCategory['id']): Promise<void> {
    await this.inventoryCategoryRepository.delete(id)
    return
  }

  async getAllSettings(): Promise<Setting[]> {
    return this.settingsRepository.find()
  }

  async getSettingByKey(key: Setting['key']): Promise<Setting | null> {
    return this.settingsRepository.findOne({ where: { key } })
  }

  async createSetting(setting: Setting): Promise<Setting> {
    return this.settingsRepository.save(setting)
  }

  async updateSetting(key: Setting['key'], updates: Partial<Setting>): Promise<Setting | null> {
    await this.settingsRepository.update({ key }, updates)
    return this.settingsRepository.findOne({ where: { key } })
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['items', 'checkout'] })
  }
  async getOrderById(id: Order['id']): Promise<Order | null> {
    return this.orderRepository.findOne({ where: { id }, relations: ['items', 'checkout'] })
  }
  async createOrder(selectedItems: Record<string, number>): Promise<Order> {
    const inventoryItems = await this.inventoryItemRepository.findBy({
      id: In(Object.keys(selectedItems))
    })
    const items: Omit<OrderItem, 'id' | 'order'>[] = inventoryItems.map(({ price, name, id }) => ({
      price,
      name,
      quantity: selectedItems[id]
    }))
    const order = {
      items
    }
    return await this.orderRepository.save(order)
  }
  async updateOrder({ id, ...rest }: Order): Promise<Order | null> {
    await this.orderRepository.update({ id }, rest)
    return this.orderRepository.findOneBy({ id })
  }

  private async calculateOrder(order: Order): Promise<CalculateOrder> {
    const taxRateSetting = await this.getSettingByKey(SettingKey.TAX_RATE)
    const taxRate = taxRateSetting?.value ?? '0'
    const calculateItems = order.items.reduce((res, curr) => {
      res.push([curr.price, curr.quantity])
      return res
    }, [] as [number, number][])
    return new CalculateOrder(calculateItems, parseFloat(taxRate))
  }
  async createCheckoutPreview(orderId: CheckoutInput['orderId']): Promise<CheckoutPreview | null> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['items']
    })
    if (!order) throw new Error(`Order ${orderId} doesn't exist!`)
    const calculator = await this.calculateOrder(order)
    return {
      amount: calculator.total,
      order
    }
  }
  async getCheckoutById(id: string): Promise<Checkout | null> {
    return await this.checkoutRepository.findOneBy({ id })
  }
  async createCheckout({ orderId, method, refId }: CheckoutInput): Promise<Checkout> {
    const preview = await this.createCheckoutPreview(orderId)
    if (!preview) throw new Error(`Order ${orderId} doesn't exist!`)
    if (!preview.amount) throw new Error(`Amount cannot be null. Order ${orderId}`)

    const status = method === CheckoutMethod.CASH ? CheckoutStatus.PAID : CheckoutStatus.PENDING
    const obj: Partial<Checkout> = {
      amount: preview.amount,
      order: preview.order,
      method,
      refId,
      status
    }

    const checkout = await this.checkoutRepository.save(obj)
    await this.orderRepository.update({ id: orderId }, { checkout })
    return checkout
  }
  async updateCheckout({ id, ...rest }: Checkout): Promise<Checkout | null> {
    await this.checkoutRepository.update({ id }, rest)
    return this.checkoutRepository.findOneBy({ id })
  }
  async deleteCheckout(id: Checkout['id']): Promise<void> {
    const ordersWithCheckout = await this.orderRepository.find({
      where: { checkout: { id } },
      relations: ['checkout']
    })
    console.log('hi', ordersWithCheckout)
    for (const order of ordersWithCheckout) {
      order.checkout = null
      const test = await this.updateOrder(order)
      console.log(test)
      await this.orderRepository.save(order)
    }
    await this.checkoutRepository.delete(id)
  }
}
