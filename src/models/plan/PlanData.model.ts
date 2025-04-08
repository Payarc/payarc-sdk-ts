export interface PlanData {
    amount?: number;
    plan_type?: string;
    name?: string;
    interval?: string;
    statement_descriptor?: string;
    interval_count?: number;
    trial_period_days?: number;
    plan_id?: string;
    plan_description?: string;
    currency?: string;
    surcharge_applicable?: number;
    parameters?: Record<string, any>;
}