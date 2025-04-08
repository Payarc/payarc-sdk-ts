export interface SubscriptionData {
    plan_id?: string;
    customer_id?: string;
    description?: string;
    tax_percent?: number;
    start_after_days?: number;
    payment_due_days?: number;
    billing_type?: number;
    trial_days?: number;
    discount_id?: string;
    end_after_cycles?: number;
}