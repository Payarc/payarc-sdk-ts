import axios, { AxiosError } from 'axios';
import { CommonService } from './CommonService';
import { CustomerRequestData } from '../models/customer/CustomerRequestData.model';
import { CustomerResponseData } from '../models/customer/CustomerResponseData.model';
import { BaseListOptions } from '../models/BaseListOptions.model';
import { CardData } from '../models/customer/CardData.model';
import { BankData } from '../models/customer/BankData.model';

interface ApiResponse<T> {
    data: T;
}

export class CustomerService {
    constructor(
        private bearerToken: string | null,
        private baseURL: string,
        private commonService: CommonService
    ) { }

    async createCustomer(customerData: CustomerRequestData): Promise<any> {
        try {
            const response: ApiResponse<any> = await axios.post(`${this.baseURL}customers`, customerData, {
                headers: { Authorization: `Bearer ${this.bearerToken}` }
            });
            const customer = this.commonService.addObjectId(response.data.data);
            if (customerData.cards && customerData.cards.length > 0) {
                const cardTokenPromises = customerData.cards.map(cardData => this.genTokenForCard(cardData));
                const cardTokens = await Promise.all(cardTokenPromises);

                if (cardTokens && cardTokens.length) {
                    const attachedCardsPromises = cardTokens.map(token =>
                        this.updateCustomer(customer.customer_id, { token_id: token.id })
                    );
                    await Promise.all(attachedCardsPromises);
                    return this.retrieveCustomer(customer.object_id);
                }
            }
            return customer;
        } catch (error: any) {
            return CommonService.manageError({ source: 'API Create customers' }, error.response || {});
        }
    }

    async retrieveCustomer(customerId: string): Promise<any> {
        if (customerId.startsWith('cus_')) {
            customerId = customerId.slice(4);
        }
        try {
            const response: ApiResponse<any> = await axios.get(`${this.baseURL}customers/${customerId}`, {
                headers: { Authorization: `Bearer ${this.bearerToken}` }
            });
            return this.commonService.addObjectId(response.data.data);
        } catch (error: any) {
            return CommonService.manageError({ source: 'API retrieve customer info' }, error.response || {});
        }
    }

    async listCustomer(searchData: BaseListOptions = {}): Promise<any> {
        const { limit = 25, page = 1, constraint = {} } = searchData;
        try {            
            const response: ApiResponse<any> = await axios.get(`${this.baseURL}customers`, {
                headers: { Authorization: `Bearer ${this.bearerToken}` },
                params: { limit, page, ...constraint }
            });
            return {
                customers: response.data.data.map(this.commonService.addObjectId),
                pagination: response.data.meta.pagination || {}
            };
        } catch (error) {
            return CommonService.manageError({ source: 'API List customers' }, (error as AxiosError).response || {});
        }
    }

    async updateCustomer(customer: string | CustomerResponseData, customerData: CustomerRequestData): Promise<any> {
        let customerId = typeof customer === 'string' ? customer : customer.object_id ?? customer.id ?? '';
        if (customerId.startsWith('cus_')) {
            customerId = customerId.slice(4);
        }
        try {
            const response: ApiResponse<any> = await axios.patch(`${this.baseURL}customers/${customerId}`, customerData, {
                headers: { Authorization: `Bearer ${this.bearerToken}` }
            });
            return this.commonService.addObjectId(response.data.data);
        } catch (error) {
            return CommonService.manageError({ source: 'API update customer info' }, (error as AxiosError).response || {});
        }
    }

    async genTokenForCard(tokenData = {}) {
        try {
            const response = await axios.post(`${this.baseURL}tokens`, tokenData, {
                headers: { Authorization: `Bearer ${this.bearerToken}` }
            });
            return response.data.data;
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error) {
                return CommonService.manageError({ source: 'API for tokens' }, error.response || {});
            }
            return CommonService.manageError({ source: 'API for tokens' }, {});
        }
    }

    async addCardToCustomer(customer: string | CustomerResponseData, cardData: CardData) {
        try {
            let customerId = typeof customer === 'string' ? customer : customer.object_id ?? customer.id ?? '';
            if (customerId.startsWith('cus_')) {
                customerId = customerId.slice(4);
            }
            const cardToken = await this.genTokenForCard(cardData);
            const attachedCards = await this.updateCustomer(customerId, { token_id: cardToken.id });
            return this.commonService.addObjectId(cardToken.card.data);
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error) {
                return CommonService.manageError({ source: 'API add card to customer' }, error.response || {});
            }
            return CommonService.manageError({ source: 'API add card to customer' }, {});
        }
    }

    async addBankAccToCustomer(customer: string | CustomerResponseData, bankData: BankData) {
        try {
            let customerId = typeof customer === 'string' ? customer : customer.object_id ?? customer.id ?? '';
            if (customerId.startsWith('cus_')) {
                customerId = customerId.slice(4);
            }
            bankData.customer_id = customerId;
            const response = await axios.post(`${this.baseURL}bankaccounts`, bankData, {
                headers: { Authorization: `Bearer ${this.bearerToken}` }
            });
            return this.commonService.addObjectId(response.data.data);
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error) {
                return CommonService.manageError({ source: 'API BankAccount to customer' }, error.response || {});
            }
            return CommonService.manageError({ source: 'API BankAccount to customer' }, {});
        }
    }

    async deleteCustomer(customerId: string): Promise<boolean> {
        if (customerId.startsWith('cus_')) {
            customerId = customerId.slice(4);
        }
        try {
            const response: ApiResponse<any> = await axios.delete(`${this.baseURL}customers/${customerId}`, {
                headers: { Authorization: `Bearer ${this.bearerToken}` }
            });
            return true;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                CommonService.manageError({ source: 'API delete customer' }, error.response || {});
            }
            return false;
        }
    }
}