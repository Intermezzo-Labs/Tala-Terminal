import { Setting, SettingKey } from '../../shared/models'
import { SettingService } from '../services/SettingService'
import defaultSettings from './defaultSettings.json'

export class SettingController {
  private settingService = new SettingService()

  async getAllSettings(): Promise<Setting[]> {
    return await this.settingService.getAllSettings()
  }

  async getSettingByKey(key: Setting['key']): Promise<Setting | null> {
    return await this.settingService.getSettingByKey(key)
  }

  private async createSetting(setting: Setting): Promise<Setting> {
    return await this.settingService.createSetting(setting)
  }

  async updateSetting(key: SettingKey, value?: string): Promise<Setting | null> {
    return await this.settingService.updateSetting(key, { value })
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
