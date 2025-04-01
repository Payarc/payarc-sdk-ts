import axios, { AxiosResponse } from 'axios';
import { CommonService } from './CommonService';
import { ApplicationInfoData } from '../models/application/ApplicationInfoData.model';
import { ApplicationResponseData } from '../models/application/ApplicationResponseData.model';
import { DocumentResponseData } from '../models/application/DocumentResponseData.model';
import { BaseListOptions } from '../models/BaseListOptions.model';
import { MerchantDocument } from '../models/application/MerchantDocument.model';

interface ApiResponse<T> {
    data: T;
    meta?: any;
    Documents?: any;}

export class ApplicationService {
    constructor(
        private bearerTokenAgent: string | null,
        private baseURL: string,
        private commonService: CommonService
    ) { }

    async addLead(applicant: ApplicationInfoData): Promise<any> {
        try {
            if (applicant.agentId?.startsWith('usr_')) {
                applicant.agentId = applicant.agentId.slice(4);
            }
            const resp: AxiosResponse<ApiResponse<any>> = await axios.post(
                `${this.baseURL}agent-hub/apply/add-lead`,
                applicant,
                { headers: { Authorization: `Bearer ${this.bearerTokenAgent}` } }
            );
            return this.commonService.addObjectId(resp.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API add lead' }, error.response || {});
        }
    }

    async applyApps(searchData: BaseListOptions = {}): Promise<any> {
        const { limit = 25, page = 1, constraint = {} } = searchData;
        try {
            const response: AxiosResponse<ApiResponse<any>> = await axios.get(
                `${this.baseURL}agent-hub/apply-apps`,
                {
                    headers: { Authorization: `Bearer ${this.bearerTokenAgent}` },
                    params: { limit: 0, is_archived: 0 }
                }
            );
            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API list Apply apps' }, error.response || {});
        }
    }

    async retrieveApplicant(applicant: ApplicationResponseData | string): Promise<any> {
        try {
            let applicantId = typeof applicant === 'string' ? applicant : applicant.object_id || '';
            if (applicantId.startsWith('appl_')) {
                applicantId = applicantId.slice(5);
            }
            const [response, docs] = await Promise.all([
                axios.get<ApiResponse<any>>(`${this.baseURL}agent-hub/apply-apps/${applicantId}`, {
                    headers: { Authorization: `Bearer ${this.bearerTokenAgent}` }
                }),
                axios.get<ApiResponse<any>>(`${this.baseURL}agent-hub/apply-documents/${applicantId}`, {
                    headers: { Authorization: `Bearer ${this.bearerTokenAgent}` },
                    params: { limit: 0 }
                })
            ]);

            delete response.data.meta;
            delete docs.data.meta;
            response.data.Documents = docs.data;
            return this.commonService.addObjectId(response.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Apply apps status' }, error.response || {});
        }
    }

    async updateApplicant(object: ApplicationResponseData | string, newData: any): Promise<any> {
        let dataId = typeof object === 'string' ? object : object.object_id || '';
        if (dataId.startsWith('appl_')) {
            dataId = dataId.slice(5);
        }
        try {
            newData = { ...newData, bank_account_type: '01', slugId: 'financial_information', skipGIACT: true };
            const response = await axios.patch(`${this.baseURL}agent-hub/apply-apps/${dataId}`, newData, {
                headers: { Authorization: `Bearer ${this.bearerTokenAgent}` }
            });
            return response.status === 200 ? this.retrieveApplicant(dataId) : this.commonService.addObjectId(response.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API update Application info' }, error.response || {});
        }
    }

    async deleteApplicant(applicant: ApplicationResponseData | string): Promise<any> {
        try {
            let applicantId = typeof applicant === 'string' ? applicant : applicant.object_id || '';
            if (applicantId.startsWith('appl_')) {
                applicantId = applicantId.slice(5);
            }
            const resp = await axios.delete(`${this.baseURL}agent-hub/apply/delete-lead`, {
                headers: { Authorization: `Bearer ${this.bearerTokenAgent}` },
                data: { MerchantCode: applicantId }
            });
            return this.commonService.addObjectId(resp.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Apply apps delete' }, error.response || {});
        }
    }

    async addApplicantDocument(applicant: ApplicationResponseData | string, document: MerchantDocument): Promise<any> {
        try {
            let applicantId = typeof applicant === 'string' ? applicant : applicant.object_id || '';
            if (applicantId.startsWith('appl_')) {
                applicantId = applicantId.slice(5);
            }
            const response = await axios.post(`${this.baseURL}agent-hub/apply/add-documents`,
                { MerchantCode: applicantId, MerchantDocuments: [document] },
                { headers: { Authorization: `Bearer ${this.bearerTokenAgent}` } }
            );
            return this.commonService.addObjectId(response.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Apply documents add' }, error.response || {});
        }
    }

    async SubAgents() {
        try {
            const response = await axios.get(`${this.baseURL}agent-hub/sub-agents`, {
                headers: { Authorization: `Bearer ${this.bearerTokenAgent}` }
            });
            return this.commonService.addObjectId(response.data?.data || []);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API List sub agents' }, error.response || {});
        }
    }

    async deleteApplicantDocument(document: string | DocumentResponseData): Promise<any> {
        try {
            let documentId = typeof document === 'string' ? document : document.object_id || '';
            if (documentId.startsWith('doc_')) {
                documentId = documentId.slice(4);
            }
            const resp = await axios.delete(`${this.baseURL}agent-hub/apply/delete-documents`, {
                headers: { Authorization: `Bearer ${this.bearerTokenAgent}` },
                data: { 'MerchantDocuments': [{ 'DocumentCode': documentId }] }
            });
            return this.commonService.addObjectId(resp.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Apply document delete' }, error.response || {});
        }
    }

    async submitApplicantForSignature(applicant: ApplicationResponseData | string) {
        try {
            let applicantId = typeof applicant === 'string' ? applicant : applicant.object_id || '';
            if (applicantId.startsWith('appl_')) {
                applicantId = applicantId.slice(5);
            }
            const response = await axios.post(
                `${this.baseURL}agent-hub/apply/submit-for-signature`,
                { 'MerchantCode': applicantId },
                {
                    headers: { Authorization: `Bearer ${this.bearerTokenAgent}` }
                }
            );
            return this.commonService.addObjectId(response.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Submit for signature' }, error.response || {});
        }
    }
}