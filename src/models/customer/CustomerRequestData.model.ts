
import { CardData } from "./CardData.model";
import { BankData } from "./BankData.model";

export interface CustomerRequestData {
    email?: string;
    name?: string;
    description?: string;
    send_email_address?: string;
    cc_email_address?: string;
    country?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    state?: string;
    zip?: number;
    phone?: number;
    token_id?: string;
    default_card_id?: string;
    cards?: CardData[];
    bank_accounts?: BankData[];
}