import { BaseResponse } from "../BaseResponse.model";

export interface BatchReportResponseData extends BaseResponse  {
  Merchant_Account_Number: string
  Settlement_Date: string
  ad_total_sale: number
  ad_total_refunds: number
  total_sale: number
  Amounts: number
  total_refunds: number
  rj_total_sale: number
  rj_total_refunds: number
  ad_net_amt: number
  total_net_amt: number
  rj_net_amt: number
  Transactions: number
  Batch_Reference_Number: string
  reject_record: string
  dba_name: string
  pfac_account_type: string
}