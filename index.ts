import { CustomerService } from './src/services/CustomerService'; 
import { ApplicationService } from './src/services/ApplicationService';
import { SplitCampaignService } from './src/services/SplitCampaignService';
import { BaseListOptions } from './src/models/BaseListOptions.model';
import { CommonService } from './src/services/CommonService';
import { CustomerRequestData } from './src/models/customer/CustomerRequestData.model';
import { CustomerResponseData } from './src/models/customer/CustomerResponseData.model';
import { ApplicationInfoData } from './src/models/application/ApplicationInfoData.model';
import { MerchantDocument } from './src/models/application/MerchantDocument.model';
import { ApplicationResponseData } from './src/models/application/ApplicationResponseData.model';
import { SplitCampaignRequestData } from './src/models/splitCampaign/SplitCampaignRequestData.model';
import { CampaignResponseData } from './src/models/splitCampaign/CampaignResponseData.model';

class Payarc {
    private customerService: CustomerService;
    private applicationService: ApplicationService;
    private splitCampaignService: SplitCampaignService;
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

    public applications: {
        create: (applicant: ApplicationInfoData) => Promise<any>,
        list: (searchData?: BaseListOptions) => Promise<any>,
        listSubAgents: (searchData?: BaseListOptions) => Promise<any>,
        retrieve: (applicant: string | ApplicationResponseData) => Promise<any>,
        update: (applicant: string | ApplicationResponseData, appData: Record<string, any>) => Promise<any>,
        addDocument: (applicant: string | ApplicationResponseData, document: MerchantDocument) => Promise<any>,
        submit: (applicant: string | ApplicationResponseData) => Promise<any>,
        deleteDocument: (documentId: string) => Promise<any>,
    }

    public splitCampaigns: {
        create: (splitCampaignData: SplitCampaignRequestData) => Promise<any>,
        list: () => Promise<any>,
        retrieve: (campaign: string | CampaignResponseData) => Promise<any>,
        update: (campaign: string | CampaignResponseData, splitCampaignData: SplitCampaignRequestData) => Promise<any>,
        listAccounts: (campaign: string | CampaignResponseData) => Promise<any>,
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
        this.commonService = new CommonService(bearerToken, bearerTokenAgent, this.baseURL);
        this.customerService = new CustomerService(bearerToken, this.baseURL, this.commonService);
        this.applicationService = new ApplicationService(bearerTokenAgent, this.baseURL, this.commonService);
        this.splitCampaignService = new SplitCampaignService(bearerTokenAgent, this.baseURL, this.commonService);
        this.customers = {
            create: this.customerService.createCustomer.bind(this.customerService),
            list: this.customerService.listCustomer.bind(this.customerService),
            update: this.customerService.updateCustomer.bind(this.customerService),
            retrieve: this.customerService.retrieveCustomer.bind(this.customerService),
            delete: this.customerService.deleteCustomer.bind(this.customerService),
        };
        this.applications = {
            create: this.applicationService.addLead.bind(this.applicationService),
            list: this.applicationService.applyApps.bind(this.applicationService),
            listSubAgents: this.applicationService.SubAgents.bind(this.applicationService),
            retrieve: this.applicationService.retrieveApplicant.bind(this.applicationService),
            update: this.applicationService.updateApplicant.bind(this.applicationService),
            addDocument: this.applicationService.addApplicantDocument.bind(this.applicationService),
            submit: this.applicationService.submitApplicantForSignature.bind(this.applicationService),
            deleteDocument: this.applicationService.deleteApplicantDocument.bind(this.applicationService),
        };
        this.splitCampaigns = {
            create: this.splitCampaignService.createCampaign.bind(this.splitCampaignService),
            list: this.splitCampaignService.getAllCampaigns.bind(this.splitCampaignService),
            retrieve: this.splitCampaignService.getDtlCampaign.bind(this.splitCampaignService),
            update: this.splitCampaignService.updateCampaign.bind(this.splitCampaignService),
            listAccounts: this.splitCampaignService.getAllAccounts.bind(this.splitCampaignService),
        };
    }
}

export default Payarc;