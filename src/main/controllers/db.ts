import { InventoryItem, NewInventoryItem, Setting, SettingKey } from '../../shared/models'
import { DatabaseService } from '../services/db'
import defaultSettings from './defaultSettings.json'

export class DatabaseController {
  private service = new DatabaseService()

  async getAllInventoryItems(): Promise<InventoryItem[]> {
    return await this.service.getAllInventoryItems()
  }
  async createInventoryItem(item: NewInventoryItem): Promise<InventoryItem> {
    console.log('here?')
    return await this.service.createInventoryItem(item)
  }

  async getAllSettings(): Promise<Setting[]> {
    return await this.service.getAllSettings()
  }

  async getSettingByKey(key: Setting['key']): Promise<Setting | null> {
    return await this.service.getSettingByKey(key)
  }

  private async createSetting(setting: Setting): Promise<Setting> {
    return await this.service.createSetting(setting)
  }

  async updateSetting(key: string, value?: string): Promise<Setting | null> {
    return await this.service.updateSetting(key as SettingKey, { value })
  }

  async initializeSettings(): Promise<void> {
    const initialSettings: Setting[] = Object.values(SettingKey).map((key) => ({
      key,
      value: defaultSettings[key].value,
      description: defaultSettings[key].description
    }))

    // Check if each setting exists, and if not, create it with the default value
    for (const setting of initialSettings) {
      const existingSetting = await this.getSettingByKey(setting.key)
      if (!existingSetting) {
        await this.createSetting(setting)
      }
    }
  }
}
