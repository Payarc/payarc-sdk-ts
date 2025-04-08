import { BaseListOptions } from "../BaseListOptions.model";

export interface SubscriptionListOptions extends BaseListOptions {
    plan?: string;
    planId?: string;
}