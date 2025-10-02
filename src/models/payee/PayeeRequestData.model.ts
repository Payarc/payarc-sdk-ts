export interface PayeeRequestData {
	type?: string;
	personal_info?: PersonalInfo;
	business_info?: BusinessInfo;
	contact_info?: ContactInfo;
	address_info?: AddressInfo;
	banking_info?: BankingInfo;
	foundation_date?: string;
	date_incorporated?: string;
}

export interface AddressInfo {
	street?: string;
	city?: string;
	zip_code?: string;
	county_code?: string;
}

export interface BankingInfo {
	dda?: string;
	routing?: string;
}

export interface BusinessInfo {
	legal_name?: string;
	ein?: string;
	irs_filing_type?: string;
}

export interface ContactInfo {
	email?: string;
	phone_number?: string;
}

export interface PersonalInfo {
	first_name?: string;
	last_name?: string;
	ssn?: string;
	dob?: string;
}
