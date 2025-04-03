import { BaseResponse } from "../BaseResponse.model";

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
    failure_code: string | null;
    failure_message: string | null;
    charge_description: string | null;
    statement_description: string;
    invoice: string | null;
    under_review: boolean;
    created_at: number;
    updated_at: number;
    email: string;
    phone_number: string;
    card_level: string | null;
    sales_tax: number | null;
    purchase_order: string | null;
    supplier_reference_number: string | null;
    customer_ref_id: string | null;
    ship_to_zip: string | null;
    amex_descriptor: string | null;
    customer_vat_number: string | null;
    summary_commodity_code: string | null;
    shipping_charges: number | null;
    duty_charges: number | null;
    ship_from_zip: string | null;
    destination_country_code: string | null;
    vat_invoice: string | null;
    order_date: string | null;
    tax_category: string | null;
    tax_type: string | null;
    tax_rate: number | null;
    tax_amount: number | null;
    created_by: string;
    terminal_register: string | null;
    tip_amount_refunded: number | null;
    sales_tax_refunded: number | null;
    shipping_charges_refunded: number | null;
    duty_charges_refunded: number | null;
    pax_reference_number: string | null;
    refund_reason: string | null;
    refund_description: string | null;
    surcharge: number;
    toll_amount: number | null;
    refund: Refund;
    card: CardData;
    sec_code?: string;
  }
  
  export interface Refund {
    data: any[]; // Assuming an array of refund objects
  }
  
  export interface CardData {
    data: Card;
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
    city: string | null;
    state: string | null;
    zip: string;
    brand: string;
    last4digit: string;
    first6digit: number;
    country: string | null;
    avs_status: string | null;
    cvc_status: string | null;
    address_check_passed: number;
    zip_check_passed: number;
    customer_id: string;
    created_at: number;
    updated_at: number;
  }
  