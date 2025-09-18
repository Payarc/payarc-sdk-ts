import { BaseResponse } from "../BaseResponse.model";
import { InstructionalFundingResponseData } from "../instructionalFunding/InstructionalFundingResponseData.model";

export interface ChargeResponseData extends BaseResponse  {
    object: string;
    id: string;
    amount: number;
    amount_refunded: number;
    amount_captured: string;
    amount_voided: number;
    application_fee_amount: number;
    tip_amount: number;
    payarc_fees: number;
    type: string;
    net_amount: number;
    captured: number;
    is_refunded: number;
    status: string;
    auth_code: string;
    failure_code?: string;
    failure_message?: string;
    charge_description?: string;
    statement_description: string;
    invoice?: string;
    under_review: boolean;
    created_at: number;
    updated_at: number;
    email: string;
    phone_number: string;
    card_level?: string;
    sales_tax?: number;
    purchase_order?: string;
    supplier_reference_number?: string;
    customer_ref_id?: string;
    ship_to_zip?: string;
    amex_descriptor?: string;
    customer_vat_number?: string;
    summary_commodity_code?: string;
    shipping_charges?: number;
    duty_charges?: number;
    ship_from_zip?: string;
    destination_country_code?: string;
    vat_invoice?: string;
    order_date?: string;
    tax_category?: string;
    tax_type?: string;
    tax_rate?: number;
    tax_amount?: number;
    created_by: string;
    terminal_register?: string;
    tip_amount_refunded?: number;
    sales_tax_refunded?: number;
    shipping_charges_refunded?: number;
    duty_charges_refunded?: number;
    pax_reference_number?: string;
    refund_reason?: string;
    refund_description?: string;
    surcharge: number;
    toll_amount?: number;
    refund: Refund;
    card: CardData;
    splits?: Split;
    sec_code?: string;
  }
  
  export interface Refund {
    data: any[]; // Assuming an array of refund objects
  }
  
  export interface CardData {
    data: Card;
  }

  export interface Split {
    data: InstructionalFundingResponseData[];
  }
  
  export interface Card {
    object: string;
    id: string;
    address1: string;
    address2: string;
    card_source: string;
    card_holder_name: string;
    is_default: number;
    exp_month: string;
    exp_year: string;
    is_verified: number;
    fingerprint: string;
    city?: string;
    state?: string;
    zip: string;
    brand: string;
    last4digit: string;
    first6digit: number;
    country?: string;
    avs_status?: string;
    cvc_status?: string;
    address_check_passed: number;
    zip_check_passed: number;
    customer_id: string;
    created_at: number;
    updated_at: number;
  }
  