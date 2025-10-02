import axios from 'axios';
import { CommonService } from './CommonService';
import { PayeeRequestData } from '../models/payee/PayeeRequestData.model';
import { BaseResponse } from '../models/BaseResponse.model';
import { BaseListOptions } from '../models/BaseListOptions.model';
import { PayeeResponseData } from '../models/payee/PayeeResponseData.model';

interface ApiResponse<T> {
    data: T;
}

export class PayeeService {
    constructor(
        private bearerTokenAgent: string | null,
        private baseURL: string,
        private commonService: CommonService
    ) { }

    async addPayee(payeeData: PayeeRequestData): Promise<BaseResponse> {
        try {
            const resp = await axios.post<BaseResponse>(`${this.baseURL}agent-hub/apply/payees`, payeeData, {
                headers: this.commonService.requestHeaders(this.bearerTokenAgent)
            });
            return this.commonService.addObjectId(resp.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API add payee' }, error.response || {});
        }
    }

    async listPayee(searchData: BaseListOptions = {}): Promise<any> {
        try {
            const { include = 'appData' } = searchData;
            const response = await axios.get<PayeeResponseData[]>(`${this.baseURL}agent-hub/apply/payees`, {
                headers: this.commonService.requestHeaders(this.bearerTokenAgent),
                params: { include }
            });
            const payees = response.data.map(payee => {
                this.commonService.addObjectId(payee);
                return payee;
            });
            return { payees };
        } catch (error: any) {
            return CommonService.manageError({ source: 'API List payees by agent' }, error.response || {});
        }
    }

    async deletePayee(payee: string | PayeeResponseData): Promise<any> {
        try {
            let payeeId = typeof payee === 'string' ? payee : payee.object_id || '';
            if (payeeId.startsWith('appy_')) {
                payeeId = payeeId.slice(5)
            }
            const resp = await axios.delete<{ data: BaseResponse }>(`${this.baseURL}agent-hub/apply/payees/${payeeId}`, {
                headers: this.commonService.requestHeaders(this.bearerTokenAgent)
            });

            if (resp.status === 204) {
                return {};
            }

            return this.commonService.addObjectId(resp.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Payee delete' }, error.response || {});
        }
    }
}