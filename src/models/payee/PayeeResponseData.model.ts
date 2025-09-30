import { BaseResponse } from "../BaseResponse.model";
import { AgentTagValues } from "../application/ApplicationResponseData.model";

export interface PayeeResponseData extends BaseResponse {
    object: string;
    object_id?: string;
    id: string;
    name: string;
    industry: any;
    processing_type: string;
    isv_merchant_type: string;
    isv_process_own_transactions: any;
    merchant_category: any;
    hubspot_record_id: any;
    bank_account_type: any;
    agent_name: string;
    agent_tag_values: AgentTagValues;
    agent_id: number;
    agent_parent_id: any;
    agent_parent_name: any;
    apply_pricing_template_id: any;
    apply_pricing_template_name: string;
    step: any;
    is_copied: any;
    created_at: string;
    updated_at: string;
    status: string;
    completed: number;
    lead_status: any;
    hardware_shippings: any;
    status_id: number;
    signature_override: any;
    giact_failed_checks: any;
    electronic_signature_full_name: any;
    possible_duplicates: any[];
}