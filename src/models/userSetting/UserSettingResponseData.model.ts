
import { BaseResponse } from "../BaseResponse.model";

export interface UserSettingResponseData extends BaseResponse {
    id?: string;
    key?: string;
    value?: string;
    user_id?: string;
    account_id?: string | null;
    created_at?: string;
    updated_at?: string;
}
