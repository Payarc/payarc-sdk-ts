import axios from "axios";
import { CommonService } from './CommonService';
import { ChargeData } from "../models/charge/ChargeData.model";
import { ChargeResponseData } from "../models/charge/ChargeResponseData.model";
import { BaseListOptions } from "../models/BaseListOptions.model";
import { AchChargeResponseData } from "../models/charge/AchChargeResponseData.model";

interface ApiResponse<T> {
    data: T;
    meta?: any;
}

export class ChargeService {
    constructor(
        private bearerToken: string | null,
        private bearerTokenAgent: string | null,
        private baseURL: string,
        private commonService: CommonService
    ) { }

    async createCharge(obj: any, chargeData?: ChargeData): Promise<any> {
        try {
            if (chargeData === undefined) {
                chargeData = obj
            }
            if (chargeData) {
                if (chargeData.source) {
                    const { source, ...rest } = chargeData;
                    chargeData =
                        typeof source === "object" && source !== null && !Array.isArray(source)
                            ? { ...rest, ...(source as Record<string, any>) }
                            : { ...rest, source };
                }

                if (obj?.object_id !== undefined) {
                    chargeData.customer_id = obj.object_id.startsWith("cus_")
                        ? obj.object_id.slice(4)
                        : obj.object_id;
                }

                if (chargeData) {
                    if (chargeData.source?.startsWith("tok_")) {
                        chargeData.token_id = chargeData.source.slice(4);
                    } else if (chargeData.source?.startsWith("cus_")) {
                        chargeData.customer_id = chargeData.source.slice(4);
                    } else if (chargeData.source?.startsWith("card_")) {
                        chargeData.card_id = chargeData.source.slice(5);
                    } else if (chargeData.source?.startsWith("bnk_") || chargeData.sec_code !== undefined) {
                        if (chargeData.source?.startsWith("bnk_")) {
                            chargeData.bank_account_id = chargeData.source.slice(4);
                            delete chargeData.source;
                        }
                        if (chargeData.bank_account_id?.startsWith("bnk_")) {
                            chargeData.bank_account_id = chargeData.bank_account_id.slice(4);
                        }
                        chargeData.type = "debit";

                        const resp = await axios.post<ApiResponse<any>>(
                            `${this.baseURL}achcharges`,
                            chargeData,
                            { headers: this.commonService.requestHeaders(this.bearerToken) }
                        );

                        return this.commonService.addObjectId(resp.data.data);
                    } else if (/^\d/.test(chargeData.source || "")) {
                        chargeData.card_number = chargeData.source;
                    }
                }

                if (chargeData.token_id?.startsWith("tok_")) {
                    chargeData.token_id = chargeData.token_id.slice(4);
                }
                if (chargeData.customer_id?.startsWith("cus_")) {
                    chargeData.customer_id = chargeData.customer_id.slice(4);
                }
                if (chargeData.card_id?.startsWith("card_")) {
                    chargeData.card_id = chargeData.card_id.slice(5);
                }

                delete chargeData.source;
            }

            const response = await axios.post<ApiResponse<any>>(
                `${this.baseURL}charges`,
                chargeData,
                { headers: this.commonService.requestHeaders(this.bearerToken), maxRedirects: 0 }
            );

            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: "API Create Charge" }, error.response || {});
        }
    }

    async getCharge(charge: ChargeResponseData | string): Promise<any> {
        try {
            let endpoint = ``;
            let chargeId = typeof charge === 'string' ? charge : charge.object_id ?? charge.id ?? '';
            let includeParams: Record<string, string> = {
                include: "transaction_metadata,extra_metadata",
            };

            if (chargeId.startsWith("ch_")) {
                chargeId = chargeId.slice(3);
                endpoint = `${this.baseURL}charges/${chargeId}`;
            } else if (chargeId.startsWith("ach_")) {
                chargeId = chargeId.slice(4);
                endpoint = `${this.baseURL}achcharges/${chargeId}`;
                includeParams = { include: "review" };
            } else {
                return [];
            }

            const response = await axios.get<ApiResponse<any>>(endpoint, {
                headers: this.commonService.requestHeaders(this.bearerToken),
                params: includeParams,
            });

            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: "API Retrieve Charge Info" }, error.response || {});
        }
    }

    async listCharge(searchData: BaseListOptions = {}): Promise<any> {
        const { limit = 25, page = 1, search = {} } = searchData;
        try {
            const response = await axios.get<ApiResponse<ChargeResponseData[]>>(`${this.baseURL}charges`, {
                headers: this.commonService.requestHeaders(this.bearerToken),
                params: { limit, page, ...search },
            });

            const charges = response.data.data.map((charge) => this.commonService.addObjectId(charge));
            const pagination = response.data.meta?.pagination || {};
            delete pagination["links"];

            return { charges, pagination };
        } catch (error: any) {
            return CommonService.manageError({ source: "API List Charges" }, error.response || {});
        }
    }

    async listChargesByAgentPayfac(): Promise<any> {
        try {
            const response = await axios.get<ApiResponse<ChargeResponseData[]>>(`${this.baseURL}agent-hub/merchant-bridge/charges`, {
                headers: this.commonService.requestHeaders(this.bearerTokenAgent),
            });

            const charges = response.data.data.map((charge) => this.commonService.addObjectId(charge));
            const pagination = response.data.meta?.pagination || {};
            delete pagination["links"];

            return { charges, pagination };
        } catch (error: any) {
            return CommonService.manageError({ source: "API List Charges" }, error.response || {});
        }
    }
        
    async listChargesByAgentTraditional(from_date: string | undefined, to_date: string | undefined): Promise<any> {
        try {
            const response = await axios.get<ApiResponse<ChargeResponseData[]>>(`${this.baseURL}agent/charges`, {
                headers: this.commonService.requestHeaders(this.bearerTokenAgent),
                params: {from_date, to_date },
            });
            const charges = response.data.data.map((charge) => this.commonService.addObjectId(charge));
            const pagination = response.data.meta?.pagination || {};
            delete pagination["links"];

            return { charges, pagination };
        } catch (error: any) {
            return CommonService.manageError({ source: "API List Charges" }, error.response || {});
        }
    }

    async refundCharge(charge: ChargeResponseData | string | AchChargeResponseData, params: Record<string, any>): Promise<any> {
        let chargeId = typeof charge === "string" ? charge : charge.object_id ?? charge.id ?? "";

        if (typeof charge !== "object" || charge === null || Array.isArray(charge)) {
            if (typeof charge === "string") {
                charge = await this.getCharge(charge);
            }
        }

        if (chargeId.startsWith("ch_")) {
            chargeId = chargeId.slice(3);
        }

        if (chargeId.startsWith("ach_")) {
            if (charge) {
                if (isAchChargeResponseData(charge)) {
                    return await this.refundACHCharge(charge, params);
                }
            }
        }

        try {
            const response = await axios.post(`${this.baseURL}charges/${chargeId}/refunds`, params, {
                headers: this.commonService.requestHeaders(this.bearerToken),
            });
            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: "API Refund a charge" }, error.response || {});
        }
    }

    async tipAdjustCharge(charge: ChargeResponseData | string | AchChargeResponseData, params: Record<string, any>): Promise<any> {
        let chargeId = typeof charge === "string" ? charge : charge.object_id ?? charge.id ?? "";
        if (typeof charge !== "object" || charge === null || Array.isArray(charge)) {
            if (typeof charge === "string") {
                charge = await this.getCharge(charge);
            }
        }
        if (chargeId.startsWith("ch_")) {
            chargeId = chargeId.slice(3);
        }
        if (chargeId.startsWith("ach_")) {
            return CommonService.manageError({ source: "API Tip Adjust a charge" }, 'Tip adjustment is not applicable for ACH charges');
        }
        try {
            const response = await axios.post(`${this.baseURL}charges/${chargeId}/tip_adjustment`, params, {
                headers: this.commonService.requestHeaders(this.bearerToken),
            });
            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: "API Tip Adjust a charge" }, error.response || {});
        }
    }

    async refundACHCharge(charge: AchChargeResponseData | string, params: Record<string, any> = {}): Promise<any> {
        if (typeof charge === "object") {
            params.type = "credit";
            params.amount = params.amount ?? charge.amount;
            params.sec_code = params.sec_code ?? charge.sec_code;

            if (charge.bank_account?.data?.object_id) {
                params.bank_account_id = params.bank_account_id ?? charge.bank_account.data.object_id;
            }

            if (params.bank_account_id?.startsWith("bnk_")) {
                params.bank_account_id = params.bank_account_id.slice(4);
            }
        }

        try {
            const response = await axios.post(`${this.baseURL}achcharges`, params, {
                headers: this.commonService.requestHeaders(this.bearerToken),
            });

            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: "API Refund ACH Charge" }, error.response || {});
        }
    }
}

function isAchChargeResponseData(obj: any): obj is AchChargeResponseData {
    return obj && typeof obj === "object" && "object_id" in obj && "bank_account" in obj;
}
