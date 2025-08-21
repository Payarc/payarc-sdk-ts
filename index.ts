import { BaseListOptions } from './src/models/BaseListOptions.model';
import { CustomerRequestData } from './src/models/customer/CustomerRequestData.model';
import { CustomerResponseData } from './src/models/customer/CustomerResponseData.model';
import { ApplicationInfoData } from './src/models/application/ApplicationInfoData.model';
import { MerchantDocument } from './src/models/application/MerchantDocument.model';
import { ApplicationResponseData } from './src/models/application/ApplicationResponseData.model';
import { SplitCampaignRequestData } from './src/models/splitCampaign/SplitCampaignRequestData.model';
import { CampaignResponseData } from './src/models/splitCampaign/CampaignResponseData.model';
import { DisputeCasesResponseData } from './src/models/dispute/DisputeCasesResponseData.model';
import { DocumentParameters } from './src/models/dispute/DocumentParameters.model';
import { SubscriptionData } from './src/models/plan/SubscriptionData.model';
import { SubscriptionListOptions } from './src/models/plan/SubscriptionListOptions.model';
import { ChargeService } from './src/services/ChargeService';
import { CustomerService } from './src/services/CustomerService';
import { ApplicationService } from './src/services/ApplicationService';
import { SplitCampaignService } from './src/services/SplitCampaignService';
import { DisputeServices } from './src/services/DisputeService';
import { PlanService } from './src/services/PlanService';
import { PayarcConnectService } from './src/services/PayarcConnectService';
import { CommonService } from './src/services/CommonService';

class Payarc {
    private chargeService: ChargeService;
    private customerService: CustomerService;
    private applicationService: ApplicationService;
    private splitCampaignService: SplitCampaignService;
    private disputeService: DisputeServices;
    private planService: PlanService;
    private payarcConnectService: PayarcConnectService;
    private commonService: CommonService;
    private baseURL: string;
    private payarcConnectBaseUrl: string;
    private payarcConnectAccessToken?: string;
    private bearerToken: string | null;
    private bearerTokenAgent: string | null;

    public charges: {
        create: (obj: any, chargeData?: any) => Promise<any>,
        retrieve: (chargeId: string | any) => Promise<any>,
        list: (searchData?: BaseListOptions) => Promise<any>,
        listByAgentPayfac: () => Promise<any>,
        listByAgentTraditional: (from_date?: string, to_date?: string) => Promise<any>,
        createRefund: (chargeId: string | any, refundData?: any) => Promise<any>,
    };

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
        listAccounts: () => Promise<any>,
    };

    public disputes: {
        list: (searchData?: BaseListOptions) => Promise<any>,
        retrieve: (caseId: string | DisputeCasesResponseData) => Promise<any>,
        addDocument: (caseId: string | DisputeCasesResponseData, document: DocumentParameters) => Promise<any>,
    };

    public billing: {
        plan: {
            create: (planData: any) => Promise<any>,
            list: (searchData?: BaseListOptions) => Promise<any>,
            retrieve: (planId: string) => Promise<any>,
            update: (planId: string, planData: any) => Promise<any>,
            delete: (planId: string) => Promise<any>,
            createSubscription: (planId: string, subscriptionData: SubscriptionData) => Promise<any>,
            subscription: {
                list: (searchData?: SubscriptionListOptions) => Promise<any>,
                cancel: (subscriptionId: string) => Promise<any>,
                update: (subscriptionId: string, subscriptionData: any) => Promise<any>,
            }
        }
    }

    public payarcConnect: {
        login: () => Promise<any>,
        sale: (tenderType: string, ecrRefNum: string, amount: string, deviceSerialNo: string) => Promise<any>,
        void: (payarcTransactionId: string, deviceSerialNo: string) => Promise<any>,
        refund: (amount: string, payarcTransactionId: string, deviceSerialNo: string) => Promise<any>,
        blindCredit: (ecrRefNum: string, amount: string, token: string, expDate: string, deviceSerialNo: string) => Promise<any>,
        auth: (ecrRefNum: string, amount: string, deviceSerialNo: string) => Promise<any>,
        postAuth: (ecrRefNum: string, origRefNum: string, amount: string, deviceSerialNo: string) => Promise<any>,
        lastTransaction: (deviceSerialNo: string) => Promise<any>,
        serverInfo: () => Promise<any>,
        terminals: () => Promise<any>,
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
        this.payarcConnectAccessToken = '';
        switch (baseUrl) {
            case 'prod':
                this.payarcConnectBaseUrl = 'https://payarcconnectapi.curvpos.com';
                break;
            case 'sandbox':
                this.payarcConnectBaseUrl = 'https://payarcconnectapi.curvpos.dev';
                break;
            case 'test':
                this.payarcConnectBaseUrl = 'http://testBaseUrl';
                break;
            default:
                this.payarcConnectBaseUrl = baseUrl;
        }
        this.commonService = new CommonService(bearerToken, bearerTokenAgent, this.baseURL, this.version);
        this.chargeService = new ChargeService(bearerToken, bearerTokenAgent, this.baseURL, this.commonService);
        this.customerService = new CustomerService(bearerToken, this.baseURL, this.commonService);
        this.applicationService = new ApplicationService(bearerTokenAgent, this.baseURL, this.commonService);
        this.splitCampaignService = new SplitCampaignService(bearerTokenAgent, this.baseURL, this.commonService);
        this.disputeService = new DisputeServices(bearerToken, this.baseURL, this.commonService);
        this.planService = new PlanService(bearerToken, this.baseURL, this.commonService);
        this.payarcConnectService = new PayarcConnectService(bearerToken, this.payarcConnectAccessToken, this.payarcConnectBaseUrl, this.commonService);
        this.charges = {
            create: this.chargeService.createCharge.bind(this.chargeService),
            retrieve: this.chargeService.getCharge.bind(this.chargeService),
            list: this.chargeService.listCharge.bind(this.chargeService),
            listByAgentPayfac: this.chargeService.listChargesByAgentPayfac.bind(this.chargeService),
            listByAgentTraditional: this.chargeService.listChargesByAgentTraditional.bind(this.chargeService),
            createRefund: this.chargeService.refundCharge.bind(this.chargeService),
        };
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
        this.disputes = {
            list: this.disputeService.listCases.bind(this.disputeService),
            retrieve: this.disputeService.getCase.bind(this.disputeService),
            addDocument: this.disputeService.addDocumentCase.bind(this.disputeService),
        };
        this.billing = {
            plan: {
                create: this.planService.createPlan.bind(this.planService),
                list: this.planService.listPlan.bind(this.planService),
                retrieve: this.planService.getPlan.bind(this.planService),
                update: this.planService.updatePlan.bind(this.planService),
                delete: this.planService.deletePlan.bind(this.planService),
                createSubscription: this.planService.createSubscription.bind(this.planService),
                subscription: {
                    list: this.planService.getAllSubscriptions.bind(this.planService),
                    cancel: this.planService.cancelSubscription.bind(this.planService),
                    update: this.planService.updateSubscription.bind(this.planService),
                }
            }
        }
        this.payarcConnect = {
            login: this.payarcConnectService.pcLogin.bind(this.payarcConnectService),
            sale: this.payarcConnectService.pcSale.bind(this.payarcConnectService),
            void: this.payarcConnectService.pcVoid.bind(this.payarcConnectService),
            refund: this.payarcConnectService.pcRefund.bind(this.payarcConnectService),
            blindCredit: this.payarcConnectService.pcBlindCredit.bind(this.payarcConnectService),
            auth: this.payarcConnectService.pcAuth.bind(this.payarcConnectService),
            postAuth: this.payarcConnectService.pcPostAuth.bind(this.payarcConnectService),
            lastTransaction: this.payarcConnectService.pcLastTransaction.bind(this.payarcConnectService),
            serverInfo: this.payarcConnectService.pcServerInfo.bind(this.payarcConnectService),
            terminals: this.payarcConnectService.pcTerminals.bind(this.payarcConnectService),
        };
    }
}

export default Payarc;
