import { CustomerService } from './src/services/CustomerService'; 
import { BaseListOptions } from './src/models/BaseListOptions.model';
import { CommonService } from './src/services/CommonService';
import { CustomerRequestData } from './src/models/customer/CustomerRequestData.model';
import { CustomerResponseData } from './src/models/customer/CustomerResponseData.model';

class Payarc {
    private customerService: CustomerService;
    private commonService: CommonService;
    private baseURL: string;
    private payarcConnectBaseUrl?: string;
    private bearerToken: string | null;
    private bearerTokenAgent: string | null;


    public customers: {
        create: (customerData: CustomerRequestData) => Promise<any>,
        list: (searchData?: BaseListOptions) => Promise<any>,
        update: (customer: string | CustomerResponseData, custData: Record<string, any>) => Promise<any>,
        retrieve: (customerId: string) => Promise<any>,
        delete: (customerId: string) => Promise<any>,
    };

    constructor(
        bearerToken: string | null,
        private baseUrl: string = 'sandbox',
        private apiVersion: string = '/v1/',
        private version: string = '1.0',
        bearerTokenAgent: string | null = null
    ) {
        this.bearerToken = bearerToken;
        this.version = version;
        this.baseURL = baseUrl === 'prod' ? 'https://api.payarc.net' : baseUrl === 'sandbox' ? 'https://testapi.payarc.net' : baseUrl;
        this.baseURL = apiVersion === '/v1/' ? `${this.baseURL}${apiVersion}` : `${this.baseURL}/v${apiVersion}/`;
        this.bearerTokenAgent = bearerTokenAgent;
        switch (baseUrl) {
            case 'prod':
                this.payarcConnectBaseUrl = 'https://payarcconnectapi.curvpos.com';
                break;
            case 'sandbox':
                this.payarcConnectBaseUrl = 'https://sandbox.payarcconnectapi.curvpos.dev';
                break;
            case 'test':
                this.payarcConnectBaseUrl = 'http://testBaseUrl';
                break;
        }
        this.commonService = new CommonService(bearerToken, this.baseURL);
        this.customerService = new CustomerService(bearerToken, this.baseURL, this.commonService);
        this.customers = {
            create: this.customerService.createCustomer.bind(this.customerService),
            list: this.customerService.listCustomer.bind(this.customerService),
            update: this.customerService.updateCustomer.bind(this.customerService),
            retrieve: this.customerService.retrieveCustomer.bind(this.customerService),
            delete: this.customerService.deleteCustomer.bind(this.customerService),
        };
    }
}

export default Payarc;