import axios, { AxiosResponse, AxiosError } from 'axios';
import { CommonService } from './CommonService';
import { CampaignResponseData } from '../models/splitCampaign/CampaignResponseData.model';
import { SplitCampaignRequestData } from '../models/splitCampaign/SplitCampaignRequestData.model';

interface ApiResponse<T> {
    data: T;
}

export class SplitCampaignService {
    constructor(
        private bearerTokenAgent: string | null,
        private baseURL: string,
        private commonService: CommonService
    ) { }

    async createCampaign(splitCampaignData: SplitCampaignRequestData): Promise<any> {
        try {
            const response: AxiosResponse<ApiResponse<any>> = await axios.post(
                `${this.baseURL}agent-hub/campaigns`, 
                splitCampaignData, 
                { headers: this.commonService.requestHeaders(this.bearerTokenAgent) }
            );
            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Create campaign' }, error);
        }
    }

    async getAllCampaigns(): Promise<any> {
        try {
            const response: AxiosResponse<ApiResponse<any>> = await axios.get(
                `${this.baseURL}agent-hub/campaigns`, 
                { 
                    headers: this.commonService.requestHeaders(this.bearerTokenAgent),
                    params: { limit: 0 } 
                }
            );
            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Get all campaigns' }, error);
        }
    }

    async getDtlCampaign(campaign: CampaignResponseData | string): Promise<any> {
        try {
            let customerId = typeof campaign === 'string' ? campaign : campaign.object_id ?? campaign.id ?? '';
            if (customerId.startsWith('cmp_')) {
                customerId = customerId.slice(4);
            }
            const response: AxiosResponse<ApiResponse<any>> = await axios.get(
                `${this.baseURL}agent-hub/campaigns/${customerId}`, 
                { 
                    headers: this.commonService.requestHeaders(this.bearerTokenAgent),
                    params: { limit: 0 } 
                }
            );
            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Get campaign details' }, error);
        }
    }

    async updateCampaign(campaign: CampaignResponseData | string, newData: SplitCampaignRequestData): Promise<any> {
        try {
            let customerId = typeof campaign === 'string' ? campaign : campaign.object_id ?? campaign.id ?? '';
            if (customerId.startsWith('cmp_')) {
                customerId = customerId.slice(4);
            }
            const response: AxiosResponse<ApiResponse<any>> = await axios.patch(
                `${this.baseURL}agent-hub/campaigns/${customerId}`, 
                newData, 
                { headers: this.commonService.requestHeaders(this.bearerTokenAgent) }
            );
            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Update campaign' }, error);
        }
    }

    async getAllAccounts(): Promise<any> {
        try {
            const response: AxiosResponse<ApiResponse<any>> = await axios.get(
                `${this.baseURL}account/my-accounts`, 
                { headers: this.commonService.requestHeaders(this.bearerTokenAgent) }
            );
            return this.commonService.addObjectId(response.data || {});
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Get all accounts' }, error);
        }
    }
}
