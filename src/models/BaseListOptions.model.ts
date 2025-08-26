export interface BaseListOptions {
    page?: number;
    limit?: number;
    search?: string;
    constraint?: Record<string, any>;
    'report_date[gte]'?: string;
    'report_date[lte]'?: string;
    from_date?: string;
    to_date?: string;
    merchant_account_number?: string;
    reference_number?: string;
    date?: string;    
  }