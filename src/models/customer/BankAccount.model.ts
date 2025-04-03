import { BaseResponse } from "../BaseResponse.model";

export interface BankAccount extends BaseResponse {
    first_name: string;
    last_name: string;
    company_name: string;
    account_type: string;
    sec_code: string;
    routing_number: string;
    account_number: string;
    is_default: string;
    customer_id: string;
  }