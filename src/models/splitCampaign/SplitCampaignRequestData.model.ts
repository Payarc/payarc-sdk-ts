export interface SplitCampaignRequestData {
    name?: string | null;
    base_charge?: number | null;
    perc_charge?: string | null;
    description?: string | null;
    notes?: string | null;
    is_default?: string | null;
    accounts?: string[] | null;
}