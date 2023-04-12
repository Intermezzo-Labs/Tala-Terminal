import { AppDataSource } from '../utils/data-source'
import { InventoryItemSchema, SettingSchema } from '../entities'
import { InventoryItem, NewInventoryItem, Setting } from '../../shared/models'

export class DatabaseService {
  private inventoryItemRepository = AppDataSource.getRepository(InventoryItemSchema)
  private settingsRepository = AppDataSource.getRepository(SettingSchema)

  async getAllInventoryItems(): Promise<InventoryItem[]> {
    return this.inventoryItemRepository.find()
  }

  async createInventoryItem(item: NewInventoryItem): Promise<InventoryItem> {
    return this.inventoryItemRepository.save(item)
  }
  async updateInventoryItem({ id, ...rest }: InventoryItem): Promise<InventoryItem | null> {
    await this.inventoryItemRepository.update({ id }, rest)
    return this.inventoryItemRepository.findOneBy({ id })
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
