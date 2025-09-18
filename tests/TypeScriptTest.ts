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

if (!bearerToken || !baseUrl || !bearerTokenAgent || !bearerTokenWithSubagent || !accountListExistingBearerToken || !disputeCaseBearerToken || !payarcConnectAccessToken ) {
  throw new Error('Missing required environment variables.');
}

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

    // payarc.instructionalFunding.list()
    // .then(instructionalFundings => console.log(JSON.stringify(instructionalFundings, null, '\t')))
    // .catch(error => console.error(error));


    payarc.instructionalFunding.create(
      {
        mid: "0709900000098856",
        amount: 500,
      }
    )
    .then((response) => {
      console.log(JSON.stringify(response, null, '\t'));
    })
    .catch(error => console.error(error));



    // await payarc.payarcConnect
    // .login()
    // .catch((error) => console.error("Error detected:", error));

    // const tenderType: string = "CREDIT";
    // const ecrRefNum: string = "123456789015";
    // const amount: string = "1";
    // const deviceSerialNo: string = "1850401309";
    // const payarcTransactionId: string = "MnBROWBMynbLyOWL";
    // const token: string = "4B195BB1FFA25228";
    // const expDate:string = "0227";
    // const origRefNum:string = "50";



    // payarc.payarcConnect
    //   .sale(tenderType, ecrRefNum, amount, deviceSerialNo)
    //   .then((result) => { console.log("Result", result) })
    //   .catch((error) => console.error("Error:", error))

  
      // payarc.payarcConnect
      //   .void(payarcTransactionId, deviceSerialNo)
      //   .then((result) => { console.log("Result", result); })
      //   .catch((error) => console.error("Error:", error));

    
        // payarc.payarcConnect
        // .refund(amount, payarcTransactionId, deviceSerialNo)
        // .then((result) => {console.log("Result", result);})
        // .catch((error) => console.error("Error:", error));

        // payarc.payarcConnect
        // .blindCredit(ecrRefNum, amount, token, expDate, deviceSerialNo)
        // .then((result) => {console.log("Result", result);})
        // .catch((error) => console.error("Error:", error));

        
    // payarc.payarcConnect
    // .auth(ecrRefNum, amount, deviceSerialNo)
    // .then((result) => {console.log("Result", result);})
    // .catch((error) => console.error("Error:", error));

    
    // payarc.payarcConnect
    // .postAuth(ecrRefNum, origRefNum, amount, deviceSerialNo)
    // .then((result) => {console.log("Result", result);})
    // .catch((error) => console.error("Error:", error));


    // payarc.payarcConnect
    // .lastTransaction(deviceSerialNo)
    // .then((result) => {console.log("Result", result);})
    // .catch((error) => console.error("Error:", error));

    // payarc.payarcConnect
    // .serverInfo()
    // .then((result) => {console.log("Result", result);})
    // .catch((error) => console.error("Error:", error));


    // payarc.payarcConnect
    // .terminals()
    // .then((result) => {console.log("Result", result);})
    // .catch((error) => console.error("Error:", error));

    //JSON.stringify(result, null, '\t')
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}

test();
