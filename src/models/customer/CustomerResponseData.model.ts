import { BaseResponse } from "../BaseResponse.model";
import { Card } from "../charges/Card.model";
import { BankAccount } from "./BankAccount.model";
import { ListBaseResponse } from "../ListBaseResponse.model";
import { CustomerRequestData } from "./CustomerRequestData.model";
import { CardData } from "./CardData.model";

export interface CustomerResponseData extends BaseResponse {
    customer_id: string;
    name: string;
    email?: string;
    description?: string;
    payment_overdue?: number;
    send_email_address?: string;
    cc_email_address?: string;
    source_id?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
    token_id?: string;
    country?: string;
    created_at: number;
    updated_at: number;
    readable_created_at: string;
    readable_updated_at: string;
    invoice_prefix: string;
    card?: CardContainer;
    bank_account?: BankAccountContainer;
    charge?: ChargeContainer;
    cards?: CardsContainer;
    bank_accounts?: BankAccountsContainer;
    update?: (data?: CustomerRequestData) => Promise<BaseResponse | null>;

}

interface CardContainer {
    data: Card[];
}

interface BankAccountContainer {
    data: BankAccount[];
}

interface ChargeContainer {
    data: any[];
}

interface CardsContainer {
    cards?: ListBaseResponse;
    create?: (data?: CardData) => Promise<BaseResponse | null>;
}

interface BankAccountsContainer {
    bank_accounts?: ListBaseResponse;
    create?: (data?: BankAccount) => Promise<BaseResponse | null>;
}