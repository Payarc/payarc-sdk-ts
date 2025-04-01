export interface BaseListOptions {
    page?: number;
    limit?: number;
    search?: string;
    constraint?: Record<string, any>;
    'report_date[gte]'?: string;
    'report_date[lte]'?: string;
  }