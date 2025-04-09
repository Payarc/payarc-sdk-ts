export interface SplitCampaignRequestData {
    name?: string;
    base_charge?: number;
    perc_charge?: string;
    description?: string;
    notes?: string;
    is_default?: string;
    accounts?: string[];
}