import axios, { AxiosResponse, AxiosError } from 'axios';
import { CommonService } from './CommonService';
import { DocumentParameters } from '../models/dispute/DocumentParameters.model';
import { BaseListOptions } from '../models/BaseListOptions.model';
import { DisputeCasesResponseData } from '../models/dispute/DisputeCasesResponseData.model';

interface ApiResponse<T> {
    data: T;
}

export class DisputeServices {
    constructor(
        private bearerToken: string | null,
        private baseURL: string,
        private commonService: CommonService
    ) { }

    private formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    async listCases(params?: BaseListOptions): Promise<any> {
        try {
            if (!params) {
                const currentDate = new Date();
                const tomorrowDate = this.formatDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
                currentDate.setMonth(currentDate.getMonth() - 60);
                const lastMonthDate = this.formatDate(currentDate);

                params = {
                    "report_date[gte]": lastMonthDate,
                    "report_date[lte]": tomorrowDate
                };
            }

            const response: AxiosResponse<ApiResponse<any>> = await axios.get(
                `${this.baseURL}cases`,
                {
                    headers: this.commonService.requestHeaders(this.bearerToken),
                    params: { ...params }
                }
            );

            return this.commonService.addObjectId(response.data.data || {});
        } catch (error: any) {
            return CommonService.manageError({ source: 'API get all disputes' }, error);
        }
    }

    async getCase(dispute: DisputeCasesResponseData | string): Promise<any> {
        try {
            let disputeId = typeof dispute === 'string' ? dispute : dispute.object_id ?? dispute.id ?? '';
            if (disputeId.startsWith('dis_')) {
                disputeId = disputeId.slice(4);
            }
            const response: ApiResponse<any> = await axios.get(
                `${this.baseURL}cases/${disputeId}`,
                {
                    headers: this.commonService.requestHeaders(this.bearerToken)
                }
            );
            return this.commonService.addObjectId(response.data?.primary_case || {});
        } catch (error: any) {
            return CommonService.manageError({ source: 'API get dispute details' }, error);
        }
    }

    async addDocumentCase(dispute: DisputeCasesResponseData | string, params: DocumentParameters): Promise<any> {
        try {
            let disputeId = typeof dispute === 'string' ? dispute : dispute.object_id ?? dispute.id ?? '';
            if (disputeId.startsWith('dis_')) {
                disputeId = disputeId.slice(4);
            }

            let headers: Record<string, string> = {};
            let formDataBuffer: Buffer | null = null;

            if (params?.DocumentDataBase64) {
                const binaryFile = Buffer.from(params.DocumentDataBase64, 'base64');
                const boundary = '----WebKitFormBoundary3OdUODzy6DLxDNt8'; // Unique boundary

                let formData = `--${boundary}\r\n`;
                formData += `Content-Disposition: form-data; name="file"; filename="filename1.png"\r\n`;
                formData += `Content-Type: ${params.mimeType || 'application/pdf'}\r\n\r\n`;
                formData += binaryFile.toString('binary');
                formData += `\r\n--${boundary}--\r\n`;

                if (params.text) {
                    formData += `--${boundary}\r\n`;
                    formData += 'Content-Disposition: form-data; name="text"\r\n\r\n';
                    formData += params.text;
                    formData += `\r\n--${boundary}--\r\n`;
                }

                formDataBuffer = Buffer.from(formData, 'binary');

                headers = {
                    'Content-Type': `multipart/form-data; boundary=${boundary}`,
                    'Content-Length': formDataBuffer.length.toString(),
                };
            }

            const requestHeaders = this.commonService.requestHeaders(this.bearerToken);
            const baseHeaders = { ...requestHeaders, ...headers };

            const response: AxiosResponse<ApiResponse<any>> = await axios.post(
                `${this.baseURL}cases/${disputeId}/evidence`,
                formDataBuffer,
                { headers: baseHeaders }
            );

            await axios.post(
                `${this.baseURL}cases/${disputeId}/submit`,
                {
                    message: params.message || 'Case number#: xxxxxxxx, submitted by SDK'
                },
                {
                    headers: this.commonService.requestHeaders(this.bearerToken)
                }
            );

            return this.commonService.addObjectId(response.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Dispute documents add' }, error);
        }
    }
}
