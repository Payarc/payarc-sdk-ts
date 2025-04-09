import { BaseResponse } from "../BaseResponse.model";

export interface PlanResponseData extends BaseResponse {
    object?: string;
    amount?: string;
    interval?: string;
    interval_count?: string;
    name?: string;
    description?: string;
    statement_descriptor?: string;
    trial_period_days?: string;
    currency?: string;
    created_at?: string;
    updated_at?: string;
}