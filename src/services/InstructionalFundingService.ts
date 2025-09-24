import axios, { AxiosResponse } from "axios";
import { CommonService } from './CommonService';
import { BaseListOptions } from "../models/BaseListOptions.model";
import { InstructionalFundingRequestData } from "../models/instructionalFunding/InstructionalFundingRequestData.model";
import { InstructionalFundingResponseData } from "../models/instructionalFunding/InstructionalFundingResponseData.model";

interface ApiResponse<T> {
    data: T;
    meta?: any;
}

export class InstructionalFundingService {
    constructor(
        private bearerToken: string | null,
        private baseURL: string,
        private commonService: CommonService
    ) { }

    private formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    async createInstructionalFunding(instructionalFundingData: InstructionalFundingRequestData): Promise<any> {
        try {
            const { mid, amount, include = 'charge' } = instructionalFundingData;
            const response: AxiosResponse<ApiResponse<InstructionalFundingResponseData>> = await axios.post(`${this.baseURL}instructional_funding`,
                { mid, amount },
                { 
                    headers: this.commonService.requestHeaders(this.bearerToken), 
                    params: { include }
                }
            );
            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Create Instructional Funding' }, error);
        }
    }

    async listInstructionalFunding(searchData: BaseListOptions = {}): Promise<any> {
        const { limit = 25, page = 1, include = 'charge' } = searchData;
        try {
            const response: AxiosResponse<ApiResponse<InstructionalFundingResponseData[]>> = await axios.get(`${this.baseURL}instructional_funding`,{
                    headers: this.commonService.requestHeaders(this.bearerToken),
                    params: { limit, page, include }
                }
            );
            const chargeSplits = response.data.data.map((funding) => this.commonService.addObjectId(funding));
            const pagination = response.data.meta?.pagination || {};
            delete pagination["links"];

            return { chargeSplits, pagination };
           // return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API list Instructional Funding' }, error.response || {});
        }
    }
}
