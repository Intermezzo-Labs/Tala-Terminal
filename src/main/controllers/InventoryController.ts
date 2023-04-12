import { InventoryItem } from '../../shared/models'
import { InventoryService } from '../services/InventoryService'

export class InventoryController {
  private inventoryService = new InventoryService()

  async getAllInventoryItems(): Promise<InventoryItem[]> {
    return await this.inventoryService.getAllInventoryItems()
  }
}
