export interface ApplicationInfoData {
    agentId?: string;
    MerchantCode?: string;
    Lead: Lead;
    BlendedRatePricing?: BlendedRatePricing;
    Owners: Owner[];
    BeneficialOwners?: BeneficialOwner[];
    Questionnaire?: Questionnaire;
    AssignedAgentEmail?: string;
    TsQuestionery?: TsQuestionery;
  }
  
  export interface BeneficialOwner {
    FirstName: string;
    LastName: string;
    Title: string;
    OwnershipPct: string;
    Address: string;
    City: string;
    State: string;
    Country: string;
    ZipCode: string;
    BirthDate: string;
    SSN: string;
    OtherIdNo: string;
    OtherIdCountry: string;
    OtherIdType: string;
    Empty: string;
  }
  
  export interface BlendedRatePricing {
    BlendedBaseCharge: string;
    BlendedChargePct: string;
    AmexOptBlue: number;
    AmexBaseCharge: string;
    AmexChargePct: string;
    DailyFee: string;
    WeeklyFee: string;
    MonthlyFee: string;
    ChargebackFee: string;
    ChargebackPercFee: string;
    FiservDiscountRateFeePct: string;
    FiservTransactionFee: string;
    FiservMonthlySplitFundingFee: string;
    FiservGatewayMonthlyFee: string;
    FiservGatewayTransactionFee: string;
    FiservGatewayTransactionFeePct: string;
    FiservAmexSponsorFeePct: string;
    FiservBatchFee: string;
    FiservSplitFundingFee: string;
    FiservTokenizationFee: string;
    FiservMonthlyMinimumFee: string;
  }
  
  export interface Lead {
    ProcessingType?: string;
    Industry: string;
    MerchantName: string;
    LegalName: string;
    ContactFirstName: string;
    ContactLastName: string;
    ContactEmail: string;
    DiscountRateProgram: string;
    Website?: string;
    IdentificationNumberType?: number;
    MerchantSSN?: string;
    TaxId?: string;
    MerchantOtherTaxId?: string;
    IrsFilingType?: string;
    FoundationDate?: string;
    SalesDeliveryOffer?: string;
    SalesAnnualMastercard?: string;
    SalesDeliveryDays0Pct?: number;
    SalesDeliveryDays1Pct?: number;
    SalesDeliveryDays8Pct?: number;
    SalesDeliveryDays15Pct?: number;
    SalesDeliveryDays30Pct?: number;
    CardPresentPct?: number;
    MotoPct?: number;
    SalesKeyedInternetPct?: number;
    SalesKeyedMailPct?: number;
    SalesKeyedPhonePct?: number;
    SalesTradeshowPct?: number;
    SalesTotalAnnual?: number;
    SalesB2BPct?: number;
    SalesB2CPct?: number;
    SalesCardB2BPct?: number;
    SalesCardB2CPct?: number;
    SalesProductServices?: string;
    MerchantBankName?: string;
    MerchantAccountAddress?: string;
    MerchantAccountCity?: string;
    MerchantAccountState?: string;
    MerchantZipCode?: string;
    DateIncorporated?: string;
    OfficeCity?: string;
    OfficeZipCode?: string;
    OfficeState?: string;
    CustomerSupportNumber?: string;
    RegisteredZipCode?: string;
    RegisteredCity?: string;
    Country?: string;
    RegisteredAddress?: string;
    RegisteredState?: string;
    BankAccountNo?: string;
    BankRoutingNo?: string;
    BankAccountType?: string;
    SlugId?: string;
    SkipGiact?: boolean;
    OwnershipType?: string;
    TotalMonthlyProcessing?: string;
    AvgTicketValue?: string;
    HighTicketValue?: string;
    SalesDeliveryDays?: string;
    OfficeAddress?: string;
    ContactPhoneNo?: string;
    StateOfIncorporation?: string;
    BusinessSummary?: string;
    CurrentyAcceptCreditCards?: string;
    ProcessingTerminated?: string;
    Bankruptcy?: string;
    CommentsOther?: string;
    DriverLicenseOrId?: string;
    MerchantAmexProcessingPerYear?: number;
  }
  
  export interface Owner {
    Title: string;
    FirstName: string;
    LastName: string;
    Address: string;
    City: string;
    State: string;
    ZipCode: string;
    PhoneNo: string;
    BirthDate: string;
    SSN: string;
    Email: string;
    OwnershipPct?: number;
    DriverLicenseNo?: string;
    DriverLicenseState?: string;
  }
  
  export interface Questionnaire {
    WebsitePayments: string;
    SSLProvider: string;
    ProdSoldNorthAmericaPct?: number;
    ProdSoldEuropePct?: number;
    ProdSoldOtherMarketsPct?: number;
    SellBusinessPct?: number;
    SellConsumerPct?: number;
    ReturnPolicy: string;
    NoRefundsInfo: string;
    ReturnPolicyOther: string;
    MonthlyRefundsPct?: number;
    RefundDays?: number;
    Refund100Pct?: boolean;
    RefundLess100PctInfo: string;
    WhenIsCustomerCharged: string;
    IsShipmentTraceable?: boolean;
    IsDeliveryReceiptRequested?: boolean;
    OrderTurnaroundTime?: number;
    AdvancedDeposits?: boolean;
    DepositPct?: number;
    DepositAmt?: number;
    WarehouseAddress: string;
    WarehouseCity: string;
    WarehouseState: string;
    WarehouseCountry: string;
    WarehouseZipCode: string;
    OwnProductAtTimeOfSale?: boolean;
    OtherCompaniesInvolved?: boolean;
    OtherCompaniesInvolvedInfo: string;
    AdvertiseInfo: string;
    WhoEntersCardInfo: string;
    IsProcessingSeasonal?: boolean;
    MembershipPayments?: boolean;
    MembershipPaymentsPct?: number;
    PackageUsageTime?: number;
    WhoManagesRecurringPayments: string;
    RecurringPaymentProvider: string;
    CaptureAVS?: boolean;
    CaptureAVSAction: string;
    CaptureCVV?: boolean;
    PerformVerifiedByVisa?: boolean;
    DoPayArcFraudCheck?: boolean;
    Empty: string;
  }
  
  export interface TsQuestionery {
    MerchantCurvPos?: number;
    TerminalType: string[];
    TerminalGatewaySetup?: string;
  }  