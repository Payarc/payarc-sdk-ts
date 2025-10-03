import { ChargeResponseData } from "../charge/ChargeResponseData.model"

export interface InstructionalFundingResponseData {
    object: string
    id: string
    amount: number
    amount_formatted: string
    percent: any
    mid: string
    status: any
    description: any
    created_at: string
    updated_at: string
    object_id: string
    charge?: Charge
}

export interface Charge {
  data: ChargeResponseData
}
