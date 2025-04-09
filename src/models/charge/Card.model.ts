import { BaseResponse } from "../BaseResponse.model";

export interface Card extends BaseResponse {
    address1?: string;
    address2?: string;
    card_source?: string;
    card_holder_name?: string;
    is_default?: boolean;
    exp_month?: string;
    exp_year?: string;
    is_verified?: string;
    fingerprint?: string;
    city?: string;
    state?: string;
    zip?: string;
    brand?: string;
    last4digit?: string;
    first6digit?: string;
    country?: string;
    avs_status?: string;
    cvc_status?: string;
    address_check_passed?: string;
    zip_check_passed?: string;
    customer_id?: string;
    created_at?: string;
    updated_at?: string;
    card_type?: string;
    bin_country?: string;
    bank_name?: string;
    bank_website?: string;
    bank_phone?: string;
  }