import { BaseResponse } from "../BaseResponse.model";

export interface BatchData extends BaseResponse {
    Merchant_Account_Number: string;
    account_type: string;
    amount: number;
    card_number: string;
    trans_type: string;
    transaction_date: string;
    pos_entry_mode: string;
    auth_code: string;
    charge_id: string;
    card_type: string;
    batch_ref_num: string;
    reject_record: string | null;
    object_id?: string;
    object?: string;
}

export interface BatchTotal {
    Amounts: number;
}

export interface GrandTotal {
    total_amount: number;
}

export interface BatchDetails {
    batch_data: BatchData[];
    batch_total: BatchTotal;
}

export type ReferenceNumberKey = {
    [key: string]: BatchDetails;
};

export type BatchReportDetailResponseData = ReferenceNumberKey & {
    grand_total: GrandTotal;
};