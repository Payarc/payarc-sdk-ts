import { BaseResponse } from "../BaseResponse.model";
import { BankAccount } from "../customer/BankAccount.model";

export interface AchChargeResponseData extends BaseResponse {
    object?: string;
    object_id?: string;
    id?: string;
    amount?: number;
    created_by?: string;
    status?: string;
    type?: string;
    authorization_id?: string;
    validation_code?: string;
    successful?: boolean;
    response_message?: string;
    created_at?: string;
    updated_at?: string;
    retried_achcharge_id?: string;
    sec_code?: string;
    bank_account?: BankWrapper;
}

export interface BankWrapper {
    data?: BankAccount;
}