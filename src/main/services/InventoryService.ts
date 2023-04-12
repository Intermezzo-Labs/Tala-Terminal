import { AppDataSource } from '../utils/data-source'
import { InventoryItemSchema } from '../entities'
import { InventoryItem } from '../../shared/models'

export class InventoryService {
  private inventoryItemRepository = AppDataSource.getRepository(InventoryItemSchema)

  async getAllInventoryItems(): Promise<InventoryItem[]> {
    return this.inventoryItemRepository.find()
  }
}
