export interface CardData {
    card_source: string;
    card_number: string;
    exp_month: string;
    exp_year: string;
    cvv: string;
    card_holder_name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    authorize_card?: string;
}