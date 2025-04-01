import { BaseResponse } from "./BaseResponse.model";

export interface ListBaseResponse {
    data?: BaseResponse[]; 
    pagination?: Record<string, any>;
    rawData?: string;
  }