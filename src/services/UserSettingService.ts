import axios from 'axios';
import { CommonService } from './CommonService';
import { BaseListOptions } from '../models/BaseListOptions.model';
import {UserSettingRequestData} from "../models/userSetting/UserSettingRequestData.model";


interface ApiResponse<T> {
    data: T;
}

export class UserSettingService {
    constructor(
        private bearerToken: string | null,
        private baseURL: string,
        private commonService: CommonService
    ) { }

    async createOrUpdateUserSetting(settingData: UserSettingRequestData): Promise<any> {
        try {
            const response: ApiResponse<any> = await axios.post(
                `${this.baseURL}my-user-settings`,
                settingData,
                {
                    headers: this.commonService.requestHeaders(this.bearerToken)
                }
            );
            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError(
                { source: 'API Create/Update User Setting' },
                error.response || {}
            );
        }
    }

    async getAllUserSettings(searchData: BaseListOptions = {}): Promise<any> {
        const { limit = 99999, page = 1, constraint = {} } = searchData;
        try {
            const response: ApiResponse<any> = await axios.get(
                `${this.baseURL}my-user-settings`,
                {
                    headers: this.commonService.requestHeaders(this.bearerToken),
                    params: { limit, page, ...constraint }
                }
            );
            return {
                userSettings: response.data.data.map(this.commonService.addObjectId),
                pagination: response.data.meta?.pagination || {}
            };
        } catch (error: any) {
            return CommonService.manageError(
                { source: 'API Get All User Settings' },
                error.response || {}
            );
        }
    }

    async deleteUserSetting(settingKey: string): Promise<boolean> {
        try {
            await axios.delete(
                `${this.baseURL}my-user-settings`,
                {
                    headers: this.commonService.requestHeaders(this.bearerToken),
                    data: { key: settingKey }
                }
            );
            return true;
        } catch (error: any) {
            CommonService.manageError(
                { source: 'API Delete User Setting' },
                error.response || {}
            );
            return false;
        }
    }
}