import axios from "axios";
import { CommonService } from './CommonService';
import { BaseListOptions } from "../models/BaseListOptions.model";
import { Account } from "../models/deposit/DepositResponseData";

interface ApiResponse<T> {
    data: T;
    meta?: any;
}

export class DepositService {
    constructor(
        private bearerToken: string | null,
        private bearerTokenAgent: string | null,
        private baseURL: string,
        private commonService: CommonService
    ) { }

    private formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    async agentDepositSummary(params?: BaseListOptions): Promise<any> {
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
            const deposits = response.data.data.map((deposit) => this.commonService.addObjectId(deposit));
            return { deposits };
        } catch (error: any) {
            return CommonService.manageError({ source: "API List deposit reports by agent" }, error.response || {});
        }
    }
}
