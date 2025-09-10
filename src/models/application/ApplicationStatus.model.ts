export enum ApplicationStatus {
    SUBMITTED = 'submitted',
    APPROVED = 'approved',
    DECLINED = 'declined',
    PENDED = 'pended'
}

export interface ApplicationStatusData {
    object_id: string;
    application_id: string;
    status: ApplicationStatus;
    status_display: string;
    updated_at: string;
    created_at: string;
    notes?: string;
    reason?: string;
    agent_name?: string;
    merchant_name?: string;
}

