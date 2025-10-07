import * as dotenv from 'dotenv';
dotenv.config();
import Payarc from '../index'
const bearerToken: string | null = process.env.PAYARC_KEY;
const baseUrl: string | undefined = process.env.PAYARC_ENV;
const bearerTokenAgent: string | undefined = process.env.PAYARC_AGENTKEY;
const bearerTokenWithSubagent: string | undefined = process.env.PAYARC_AGENTWITHSUBAGENTKEY;
const accountListExistingBearerToken: string | undefined = process.env.PAYARC_ACCOUNTLISTEXISTINGKEY;
const disputeCaseBearerToken: string | undefined = process.env.PAYARC_DISPUTECASEKEY;
const payarcConnectAccessToken: string | undefined = process.env.PAYARC_PAYARCCONNECTKEY;
const apiVersion: string = '/v1/';
const version: string = '1.0';
// if (!bearerToken || !baseUrl || !bearerTokenAgent || !bearerTokenWithSubagent || !accountListExistingBearerToken || !disputeCaseBearerToken || !payarcConnectAccessToken) {
//     throw new Error('Missing required environment variables.');
// }
const payarc = new Payarc(
    bearerToken,
    // payarcConnectAccessToken,
    baseUrl,
    apiVersion,
    version,
    bearerTokenAgent,
);
async function test(): Promise<void> {
    try {
        // ============== PAYEE TESTS ==============
        // Delete Payee
        // payarc.payee.delete("appy_xmylbgqwwkpgv98r")
        //   .then((response) => {
        //     console.log(response);
        //   });

        // List Payees
        // payarc.payee.list()
        //   .then((response) => {
        //     console.log(JSON.stringify(response, null, '\t'));
        //   });

        // Create Payee
        // payarc.payee.create({
        //   type: "sole_prop",
        //   personal_info: {
        //     first_name: "TestName",
        //     last_name: "TestLast",
        //     ssn: "123456789",
        //     dob: "2005-06-10"
        //   },
        //   business_info: {
        //     legal_name: "Test Business",
        //     ein: "12-3456789",
        //     irs_filing_type: "\"A\""
        //   },
        //   contact_info: {
        //     email: "test@example.com",
        //     phone_number: "1234567890"
        //   },
        //   address_info: {
        //     street: "123 Test St",
        //     city: "Test City",
        //     zip_code: "12345",
        //     county_code: "NY"
        //   },
        //   banking_info: {
        //     dda: "123456789",
        //     routing: "987654321"
        //   },
        //   foundation_date: "2025-09-15",
        //   date_incorporated: "2025-09-15"
        // })
        //   .then((response) => {
        //     console.log("Payee created: ", response);
        //   })
        //   .catch(error => console.error(error));

        // ============== USER SETTINGS TESTS ==============

        // Create or Update a webhook setting
        // payarc.userSettings.createOrUpdate({
        //   key: 'merchant.onboarded.webhook',
        //   value: 'https://your-domain.com/webhooks/onboarding'
        // })
        //   .then((response) => {
        //     console.log('Create/Update Result:', response);
        //   })
        //   .catch(error => console.error('Error:', error));

        // List all user settings
        // payarc.userSettings.list()
        //     .then((response) => {
        //         console.log('User Settings:', JSON.stringify(response, null, '\t'));
        //     })
        //     .catch(error => console.error('Error:', error));

        // List with pagination
        // payarc.userSettings.list({
        //   limit: 5,
        //   page: 1
        // })
        //   .then((response) => {
        //     console.log('User Settings (paginated):', JSON.stringify(response, null, '\t'));
        //   })
        //   .catch(error => console.error('Error:', error));

        // Delete a webhook setting
        // payarc.userSettings.delete('merchant.onboarded.webhook')
        //   .then((response) => {
        //     console.log('Delete Result:', response);
        //   })
        //   .catch(error => console.error('Error:', error));

        // Create multiple webhooks
        // const webhookConfigs = [
        //   {
        //     key: 'merchant.onboarded.webhook',
        //     value: 'https://your-domain.com/webhooks/onboarding4'
        //   },
        //   {
        //     key: 'lead.updated.webhook',
        //     value: 'https://your-domain.com/webhooks/lead-update5'
        //   },
        //   {
        //     key: 'lead.category.updated.webhook',
        //     value: 'https://your-domain.com/webhooks/lead-category6'
        //   },
        //   {
        //     key: 'lead.underwriting.updated.webhook',
        //     value: 'https://your-domain.com/webhooks/underwriting7'
        //   }
        // ];
        // Promise.all(
        //   webhookConfigs.map(config => payarc.userSettings.createOrUpdate(config))
        // )
        //   .then((results) => {
        //     console.log('Multiple Webhooks Created:', JSON.stringify(results, null, '\t'));
        //   })
        //   .catch(error => console.error('Error:', error));

    } catch (error) {
        console.error('Error:', error);
    }
}
test();