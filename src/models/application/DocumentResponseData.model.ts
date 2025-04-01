import { BaseResponse } from "../BaseResponse.model";
export interface DocumentResponseData extends BaseResponse {
    object: string;
    id: string;
    file_name: string;
    file_type: string;
    file_order: number;
    created_at: string;
    updated_at: string;
}