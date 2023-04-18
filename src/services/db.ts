import { AppDataSource } from '../db/data-source'
import { InventoryCategorySchema, InventoryItemSchema, SettingSchema } from '../db/entities'
import {
  InventoryCategory,
  InventoryCategoryInput,
  InventoryItem,
  InventoryItemInput,
  Setting
} from '../shared/models'
import { FindManyOptions, In } from 'typeorm'

export class DatabaseService {
  private settingsRepository = AppDataSource.getRepository(SettingSchema)
  private inventoryItemRepository = AppDataSource.getRepository(InventoryItemSchema)
  private inventoryCategoryRepository = AppDataSource.getRepository(InventoryCategorySchema)

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

  async getAllInventoryCategories(withItems = false): Promise<InventoryCategory[]> {
    const options: FindManyOptions<InventoryCategory> | undefined = {}
    if (withItems) {
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
    const response = await this.inventoryCategoryRepository.delete(id)
    console.log(response)
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
}
