export interface BaseListOptions {
    page?: number;
    limit?: number;
    search?: string;
    constraint?: Record<string, any>;
    report_DateGTE?: string;
    report_DateLTE?: string;
  }