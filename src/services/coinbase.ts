import { Client, CreateCharge, resources, Pagination } from 'coinbase-commerce-node'
import { config } from 'dotenv'
config()

const apiKey = process.env.COINBASE_API_KEY

if (!apiKey) throw 'COINBASE_API_KEY must be set'
Client.init(apiKey)

export interface CoinbaseChargeArgs {
  description: string
  amount: string
  metadata?: Record<string, unknown>
}
export type CoinbaseChargeResponse = resources.Charge

export const createCoinbaseCharge = async ({
  description,
  amount,
  metadata
}: CoinbaseChargeArgs): Promise<CoinbaseChargeResponse> => {
  const chargeData: CreateCharge = {
    name: 'Tala Terminal by Intermezzo Labs',
    description,
    metadata,
    local_price: {
      amount: amount,
      currency: 'USD'
    },
    pricing_type: 'fixed_price'
  }
  return await resources.Charge.create(chargeData)
}

export const getCoinbaseCharges = async (): Promise<[CoinbaseChargeResponse[], Pagination]> => {
  return await resources.Charge.list({})
}
export const getCoinbaseChargeByCodeOrId = async (
  code: string
): Promise<CoinbaseChargeResponse> => {
  return await resources.Charge.retrieve(code)
}
