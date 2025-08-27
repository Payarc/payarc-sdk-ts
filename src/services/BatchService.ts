import axios from "axios";
import { CommonService } from './CommonService';
import { BaseListOptions } from "../models/BaseListOptions.model";
import { BatchReportResponseData } from "../models/batch/BatchReportResponseData";
import { BatchData, BatchReportDetailResponseData } from "../models/batch/BatchReportDetailResponseData";

interface ApiResponse<T> {
    data: T;
    meta?: any;
}

export class BatchService {
    constructor(
        private bearerToken: string | null,
        private bearerTokenAgent: string | null,
        private baseURL: string,
        private commonService: CommonService
    ) { }

    private formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    async listBatchReportsByAgent(params?: BaseListOptions): Promise<any> {
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
            console.log("Request Params:", { ...params });
            const response = await axios.get<ApiResponse<BatchReportResponseData[]>>(`${this.baseURL}agent/batch/reports`, {
                headers: this.commonService.requestHeaders(this.bearerTokenAgent),
                params: { ...params },
            });
            const batches = response.data.data.map((batch) => this.commonService.addObjectId(batch));
            const pagination = response.data.meta?.pagination || {};
            delete pagination["links"];

            return { batches, pagination };
        } catch (error: any) {
            return CommonService.manageError({ source: "API List batches by agent" }, error.response || {});
        }
    }

    async listBatchReportDetailsByAgent(params?: BaseListOptions): Promise<any> {
        try {
            const { merchant_account_number, reference_number, date } = params || {};
            if (typeof reference_number === 'undefined' || typeof reference_number !== 'string') {
                console.error("Reference number is not defined or is not a string.");
                return [];
            }
            const response = await axios.get<ApiResponse<BatchReportDetailResponseData>>(`${this.baseURL}agent/batch/reports/details/${merchant_account_number}`, {
                headers: this.commonService.requestHeaders(this.bearerTokenAgent),
                params: { reference_number, date },
            });
            const apiResponseData = response.data.data;
            const batchDetails = apiResponseData?.[reference_number];
            let batchData: BatchData[] = [];
            if (batchDetails) {
                batchData = batchDetails.batch_data.map((batch) => this.commonService.addObjectId(batch));
            }
            if (apiResponseData && reference_number in apiResponseData) {
                apiResponseData[reference_number].batch_data = batchData;
            }
            return response.data;
        } catch (error: any) {
            return CommonService.manageError({ source: "API List batch details by agent" }, error.response || {});
        }
    }
}
