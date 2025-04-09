import axios from 'axios';
import { CommonService } from './CommonService';
import { PlanData } from '../models/plan/PlanData.model';
import { SubscriptionData } from '../models/plan/SubscriptionData.model';
import { PlanResponseData } from '../models/plan/PlanResponseData.model';
import { SubscriptionListOptions } from '../models/plan/SubscriptionListOptions.model';
import { BaseListOptions } from '../models/BaseListOptions.model';

interface ApiResponse<T> {
    data: T;
}

export class PlanService {
    constructor(
        private bearerToken: string | null,
        private baseURL: string,
        private commonService: CommonService
    ) { }

    async createPlan(data: PlanData): Promise<any> {
        data.currency = data.currency || 'usd';
        data.plan_type = data.plan_type || 'digital';

        try {
            const response: ApiResponse<any> = await axios.post(`${this.baseURL}plans`, data, {
                headers: { Authorization: `Bearer ${this.bearerToken}` },
            });
            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Create Plan' }, error.response || {});
        }
    }

    async getPlan(params: PlanResponseData | string): Promise<any> {
        const dataId = typeof params === 'string' ? params : params.object_id || params;
        try {
            const response: ApiResponse<any> = await axios.get(`${this.baseURL}plans/${dataId}`, {
                headers: { Authorization: `Bearer ${this.bearerToken}` },
            });
            return this.commonService.addObjectId(response.data.data || {});
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Get Plan Details' }, error.response || {});
        }
    }

    async listPlan(params: SubscriptionListOptions = {}): Promise<any> {
        params.limit = params.limit || 99999;
        try {
            const response: ApiResponse<any> = await axios.get(`${this.baseURL}plans`, {
                headers: { Authorization: `Bearer ${this.bearerToken}` },
                params: { ...params },
            });
            return this.commonService.addObjectId(response.data.data || {});
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Get All Plans' }, error.response || {});
        }
    }

    async updatePlan(params: PlanResponseData | string, newData: PlanData): Promise<any> {
        const dataId = typeof params === 'string' ? params : params.object_id || params;
        try {
            const response: ApiResponse<any> = await axios.patch(`${this.baseURL}plans/${dataId}`, newData, {
                headers: { Authorization: `Bearer ${this.bearerToken}` },
            });
            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Update Plan' }, error.response || {});
        }
    }

    async deletePlan(params: PlanResponseData | string): Promise<void> {
        const dataId = typeof params === 'string' ? params : params.object_id || params;
        try {
            const response: ApiResponse<any> = await axios.delete(`${this.baseURL}plans/${dataId}`, {
                headers: { Authorization: `Bearer ${this.bearerToken}` },
            });
        } catch (error: any) {
            CommonService.manageError({ source: 'API Delete Plan' }, error.response || {});
        }
    }

    async getAllSubscriptions(params: BaseListOptions = {}): Promise<any> {
        params.limit = params.limit || 99999;
        try {
            const response: ApiResponse<any> = await axios.get(`${this.baseURL}subscriptions`, {
                headers: { Authorization: `Bearer ${this.bearerToken}` },
                params: { ...params },
            });
            return this.commonService.addObjectId(response.data.data || {});
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Get All Subscriptions' }, error.response || {});
        }
    }

    async createSubscription(params: PlanResponseData | string, newData: SubscriptionData): Promise<any> {
        const dataId = typeof params === 'string' ? params : params.object_id ?? '';
        newData.plan_id = dataId;
        newData.customer_id = newData.customer_id?.startsWith('cus_') ? newData.customer_id.slice(4) : newData.customer_id;

        try {
            const response = await axios.post(`${this.baseURL}subscriptions`, newData, {
                headers: { Authorization: `Bearer ${this.bearerToken}` },
            });
            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Create Subscription' }, error.response || {});
        }
    }

    async cancelSubscription(params: PlanResponseData | string): Promise<any> {
        let dataId = typeof params === 'string' ? params : params.object_id ?? '';
        dataId = dataId.startsWith('sub_') ? dataId.slice(4) : dataId;
        try {
            const response: ApiResponse<any> = await axios.patch(`${this.baseURL}subscriptions/${dataId}/cancel`, {}, {
                headers: { Authorization: `Bearer ${this.bearerToken}` },
            });
            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Cancel Subscription' }, error.response || {});
        }
    }

    async updateSubscription(params: PlanResponseData | string, newData: SubscriptionData): Promise<any> {
        let dataId = typeof params === 'string' ? params : params.object_id ?? '';
        dataId = dataId.startsWith('sub_') ? dataId.slice(4) : dataId;
        try {
            const response: ApiResponse<any> = await axios.patch(`${this.baseURL}subscriptions/${dataId}`, newData, {
                headers: { Authorization: `Bearer ${this.bearerToken}` },
            });
            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Update Subscription' }, error.response || {});
        }
    }
}