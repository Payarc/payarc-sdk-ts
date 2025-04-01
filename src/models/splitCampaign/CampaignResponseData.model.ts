import { BaseResponse } from "../BaseResponse.model";
export interface CampaignResponseData extends BaseResponse {
    object: string;
    id: string;
    name: string;
    description: string;
    notes: string;
    status: string;
    base_charge: number;
    perc_charge: number;
    is_default: string;
    created_at: string;
    updated_at: string;
    readable_created_at: string;
    readable_updated_at: string;
    account: Account;
    update: (campaignData: CampaignResponseData) => Promise<BaseResponse | null>;
    retrieve: () => Promise<BaseResponse | null>;
}

export interface Account {
    data: any[];
}