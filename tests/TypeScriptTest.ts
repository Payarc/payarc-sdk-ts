import * as dotenv from 'dotenv';
dotenv.config();

import Payarc from '../index'

const bearerToken: string | undefined = process.env.PAYARC_KEY;
const baseUrl: string | undefined = process.env.PAYARC_ENV;
const bearerTokenAgent: string | undefined = process.env.PAYARC_AGENTKEY;
const bearerTokenWithSubagent: string | undefined = process.env.PAYARC_AGENTWITHSUBAGENTKEY;
const accountListExistingBearerToken: string | undefined = process.env.PAYARC_ACCOUNTLISTEXISTINGKEY;
const disputeCaseBearerToken: string | undefined = process.env.PAYARC_DISPUTECASEKEY;
const apiVersion: string = '/v1/';
const version: string = '1.0';

if (!bearerToken || !baseUrl || !bearerTokenAgent || !bearerTokenWithSubagent || !accountListExistingBearerToken || !disputeCaseBearerToken) {
  throw new Error('Missing required environment variables.');
}

const payarc = new Payarc(
  bearerToken,
  baseUrl,
  apiVersion,
  version,
  bearerTokenAgent,
);

async function test(): Promise<void> {
  try {


    payarc.payarcConnect
    .terminals()
    .then((result) => {console.log("Result", result);})
    .catch((error) => console.error("Error:", error));

    //JSON.stringify(result, null, '\t')
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}

test();
