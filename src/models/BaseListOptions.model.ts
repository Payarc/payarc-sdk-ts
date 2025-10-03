export interface BaseListOptions {
  page?: number;
  limit?: number;
  search?: string;
  include?: string;
  constraint?: Record<string, any>;
  'report_date[gte]'?: string;
  'report_date[lte]'?: string;
  from_date?: string;
  to_date?: string;
}
