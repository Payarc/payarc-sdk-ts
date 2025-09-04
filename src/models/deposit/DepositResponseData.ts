export interface RowDataItem {
  processing_date: string;
  effective_date: string;
  transType: string;
  amount: number;
  release_amount: number | null;
  batch_reference_number: string | null;
  transaction_count: number | null;
  merchant_statement_id: string | null;
  release_date: string | null;
  cb_reference_number: string | null;
  reserve_funding_department: string | null;
  sorting_reference_number: string;
  line_item: string;
  description: string;
}

export interface RowTotals {
  Amounts: number;
  Transactions: number;
  Settlement_Date: string;
}

export interface DepositDetail {
  row_data: RowDataItem[];
  row_totals: RowTotals;
}

export interface Deposits {
  [date: string]: DepositDetail;
}

export interface Account {
  id: string;
  object: string;
  legal_name: string;
  dba_name: string;
  mid: string;
  deposits: Deposits;
}

export interface Meta {
  include: string[];
  custom: string[];
}