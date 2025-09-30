import * as dotenv from 'dotenv';
dotenv.config();

import Payarc from '../index'

const bearerToken: string | undefined = process.env.PAYARC_KEY;
const baseUrl: string | undefined = process.env.PAYARC_ENV;
const bearerTokenAgent: string | undefined = process.env.PAYARC_AGENTKEY;
const bearerTokenWithSubagent: string | undefined = process.env.PAYARC_AGENTWITHSUBAGENTKEY;
const accountListExistingBearerToken: string | undefined = process.env.PAYARC_ACCOUNTLISTEXISTINGKEY;
const disputeCaseBearerToken: string | undefined = process.env.PAYARC_DISPUTECASEKEY;
const payarcConnectAccessToken: string | undefined = process.env.PAYARC_PAYARCCONNECTKEY;
const apiVersion: string = '/v1/';
const version: string = '1.0';

if (!bearerToken || !baseUrl || !bearerTokenAgent || !bearerTokenWithSubagent || !accountListExistingBearerToken || !disputeCaseBearerToken || !payarcConnectAccessToken) {
  throw new Error('Missing required environment variables.');
}

const payarc = new Payarc(
  //bearerToken,
  payarcConnectAccessToken,
  baseUrl,
  apiVersion,
  version,
  bearerTokenAgent,
);

async function test(): Promise<void> {
  try {
    // Delete Payee
    payarc.payee.delete("appy_xmylbgqwwkpgv98r")
      .then((response) => {
        console.log(response);
      });

    // List Payees
    payarc.payee.list()
      .then((response) => {
        console.log(JSON.stringify(response, null, '\t'));
      });

    // Create Payee
    payarc.payee.create({
      type: "sole_prop",
      personal_info: {
        first_name: "TestName",
        last_name: "TestLast",
        ssn: "123456789",
        dob: "2005-06-10"
      },
      business_info: {
        legal_name: "Test Business",
        ein: "12-3456789",
        irs_filing_type: "\"A\""
      },
      contact_info: {
        email: "test@example.com",
        phone_number: "1234567890"
      },
      address_info: {
        street: "123 Test St",
        city: "Test City",
        zip_code: "12345",
        county_code: "NY"
      },
      banking_info: {
        dda: "123456789",
        routing: "987654321"
      },
      foundation_date: "2025-09-15",
      date_incorporated: "2025-09-15"
    })
      .then((response) => {
        console.log("Payee created: ", response);
      })
      .catch(error => console.error(error));
  } catch (error) {
    console.error('Error:', error);
  }
}

test();