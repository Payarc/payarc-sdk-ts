import { CustomerRequestData } from "../models/customer/CustomerRequestData.model";
import { CardData } from "../models/customer/CardData.model";
import { BankData } from "../models/customer/BankData.model";
import { CustomerService } from "./CustomerService";
import { ApplicationService } from "./ApplicationService";
import { SplitCampaignService } from "./SplitCampaignService";
import { MerchantDocument } from "../models/application/MerchantDocument.model";
import { SplitCampaignRequestData } from "../models/splitCampaign/SplitCampaignRequestData.model";

export class CommonService {
    public customerService: CustomerService;
    public applicationService: ApplicationService;
    public splitCampaignService: SplitCampaignService;
    constructor(
        private bearerToken: string | null,
        private bearerTokenAgent: string | null,
        private baseURL: string
    ) {
        this.customerService = new CustomerService(this.bearerToken, this.baseURL, this);
        this.applicationService = new ApplicationService(this.bearerTokenAgent, this.baseURL, this);
        this.splitCampaignService = new SplitCampaignService(this.bearerTokenAgent, this.baseURL, this);
    }

    addObjectId(object: any): any {
        const handleObject = (obj: any) => {
            if (obj.id || obj.customer_id) {
                if (obj.object === 'Charge') {
                    obj.object_id = `ch_${obj.id}`;
                    //obj.createRefund = this.refundCharge.bind(this, obj)
                } else if (obj.object === 'customer') {
                    obj.object_id = `cus_${obj.customer_id}`;
                    obj.update = async (customerData: CustomerRequestData) => await this.customerService.updateCustomer(obj, customerData);
                    if (obj.cards === undefined) {
                        obj.cards = {}
                    }
                    obj.cards.create = async (cardData: CardData) => await this.customerService.addCardToCustomer(obj, cardData);
                    if (obj.bank_accounts === undefined) {
                        obj.bank_accounts = {}
                    }
                    obj.bank_accounts.create = async (bankData: BankData) => await this.customerService.addBankAccToCustomer(obj, bankData);
                    if (obj.charges === undefined) {
                        obj.charges = {};
                    }
                    //obj.charges.create = this.createCharge.bind(this, obj)
                } else if (obj.object === 'Token') {
                    obj.object_id = `tok_${obj.id}`;
                } else if (obj.object === 'Card') {
                    obj.object_id = `card_${obj.id}`;
                } else if (obj.object === 'BankAccount') {
                    obj.object_id = `bnk_${obj.id}`;
                } else if (obj.object === 'ACHCharge') {
                    obj.object_id = `ach_${obj.id}`;
                    //obj.createRefund = this.refundCharge.bind(this, obj)
                } else if (obj.object === 'ApplyApp') {
                    obj.object_id = `appl_${obj.id}`;
                    obj.retrieve = async () => await this.applicationService.retrieveApplicant(obj);
                    obj.addDocument = async (document: MerchantDocument) => await this.applicationService.addApplicantDocument(obj, document);
                    obj.submit = async () => await this.applicationService.submitApplicantForSignature(obj);
                    obj.delete = async () => await this.applicationService.deleteApplicant(obj);
                    obj.update = async (appData: Record<string, any>) => await this.applicationService.updateApplicant(obj, appData);
                    obj.listSubAgents = async () => await this.applicationService.SubAgents();
                } else if (obj.object === 'ApplyDocuments') {
                    obj.object_id = `doc_${obj.id}`;
                    obj.delete = async () => await this.applicationService.deleteApplicantDocument(obj);
                    // obj.delete = this.deleteApplicantDocument.bind(this, obj)
                } else if (obj.object === 'Campaign') {
                    obj.object_id = `cmp_${obj.id}`;
                    obj.update = async (campaignData: SplitCampaignRequestData) => await this.splitCampaignService.updateCampaign(obj, campaignData);
                    obj.retrieve = async () => await this.splitCampaignService.getDtlCampaign(obj);
                } else if (obj.object === 'User') {
                    obj.object_id = `usr_${obj.id}`;
                } else if (obj.object === 'Subscription') {
                    obj.object_id = `sub_${obj.id}`;
                    // obj.cancel = this.cancelSubscription.bind(this, obj)
                    // obj.update = this.updateSubscription.bind(this, obj)
                } else if (obj.object === "Cases") {
                    obj.object = "Dispute";
                    obj.object_id = `dis_${obj.id}`;
                }
            } else if (obj.MerchantCode) {
                obj.object_id = `appl_${obj.MerchantCode}`;
                obj.object = 'ApplyApp';
                delete obj.MerchantCode;
                obj.retrieve = async () => await this.applicationService.retrieveApplicant(obj);
                obj.addDocument = async (document: MerchantDocument) => await this.applicationService.addApplicantDocument(obj, document);
                obj.submit = async () => await this.applicationService.submitApplicantForSignature(obj);
                obj.delete = async () => await this.applicationService.deleteApplicant(obj);
                obj.update = async (appData: Record<string, any>) => await this.applicationService.updateApplicant(obj, appData);
                obj.listSubAgents = async () => await this.applicationService.SubAgents();
            } else if (obj.plan_id) { //This is plan object
                obj.object_id = obj.plan_id
                obj.object = 'Plan'
                delete obj.plan_id
                //add functions
                // obj.retrieve = this.getPlan.bind(this, obj)
                // obj.update = this.updatePlan.bind(this, obj)
                // obj.delete = this.deletePlan.bind(this, obj)
                // obj.createSubscription = this.createSubscription.bind(this, obj)
            }

            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object' && obj[key] !== null) {
                        handleObject(obj[key]);  // Recursive call for nested objects
                    } else if (Array.isArray(obj[key])) {
                        obj[key].forEach(item => {
                            if (typeof item === 'object' && item !== null) {
                                handleObject(item);  // Recursive call for items in arrays
                            }
                        });
                    }
                }
            }
            return obj;
        };
        return handleObject(object);
    }

    static manageError(
        seed: Record<string, any>,
        error: any
    ): Record<string, any> {
        return {
            ...seed,
            object: `Error v1`, // or whatever fixed version string you want
            type: 'API Error',
            errorMessage: error.statusText || 'Unknown',
            errorCode: error.status || 'Unknown',
            errorList: error.data?.errors || [],
            errorException: error.data?.exception || 'Unknown',
            errorDataMessage: error.data?.message || 'Unknown',
        };
    }
}
