import { AppDataSource } from '../utils/data-source'
import { InventoryCategorySchema, InventoryItemSchema, SettingSchema } from '../entities'
import {
  InventoryCategory,
  InventoryCategoryInput,
  InventoryItem,
  InventoryItemInput,
  Setting
} from '../../shared/models'

export class DatabaseService {
  private inventoryItemRepository = AppDataSource.getRepository(InventoryItemSchema)
  private inventoryCategoryRepository = AppDataSource.getRepository(InventoryCategorySchema)
  private settingsRepository = AppDataSource.getRepository(SettingSchema)

  async getAllInventoryItems(): Promise<InventoryItem[]> {
    return this.inventoryItemRepository.find()
  }

  async createInventoryItem(item: InventoryItemInput): Promise<InventoryItem> {
    return this.inventoryItemRepository.save(item)
  }
  async updateInventoryItem({ id, ...rest }: InventoryItem): Promise<InventoryItem | null> {
    await this.inventoryItemRepository.update({ id }, rest)
    return this.inventoryItemRepository.findOneBy({ id })
  }

  async getAllInventoryCategories(): Promise<InventoryCategory[]> {
    return this.inventoryCategoryRepository.find()
  }
  async createInventoryCategory(category: InventoryCategoryInput): Promise<InventoryCategory> {
    return this.inventoryCategoryRepository.save(category)
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
