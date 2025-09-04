import axios from "axios";
import { CommonService } from './CommonService';
import { BaseListOptions } from "../models/BaseListOptions.model";
import { Account } from "../models/account/DepositReportResponse";

interface ApiResponse<T> {
    data: T;
    meta?: any;
}

export class AccountService {
    constructor(
        private bearerToken: string | null,
        private bearerTokenAgent: string | null,
        private baseURL: string,
        private commonService: CommonService
    ) { }

    private formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    async listDepositReportsByAgent(params?: BaseListOptions): Promise<any> {
        try {
            if (!params) {
                const currentDate = new Date();
                const tomorrowDate = this.formatDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
                currentDate.setMonth(currentDate.getMonth() - 1);
                const lastMonthDate = this.formatDate(currentDate);

                params = {
                    from_date: lastMonthDate,
                    to_date: tomorrowDate
                };
            }
            const response = await axios.get<ApiResponse<Account[]>>(`${this.baseURL}agent/deposit/summary`, {
                headers: this.commonService.requestHeaders(this.bearerTokenAgent),
                params: { ...params },
            });
            const accounts = response.data.data.map((batch) => this.commonService.addObjectId(batch));
            const pagination = response.data.meta?.pagination || {};
            delete pagination["links"];

            return { accounts, pagination };
        } catch (error: any) {
            return CommonService.manageError({ source: "API List deposit reports by agent" }, error.response || {});
        }
    }
}
