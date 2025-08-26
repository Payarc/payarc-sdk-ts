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
  bearerToken,
  //payarcConnectAccessToken,
  baseUrl,
  apiVersion,
  version,
  bearerTokenAgent,
);

async function test(): Promise<void> {
  try {

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

    //   payarc.charges.create({
    //     amount: 288, // Amount in cents
    //     currency: 'usd', // Currency code (e.g., 'usd')
    // source:{
    //     card_number: '4012000098765439', // Payment source (e.g., credit card number)
    //     exp_month: '03',  //Credit card attributes 
    //     exp_year: '2025', //Credit card attributes 
    //     }
    // })
    //     .then(charge => console.log('Success the charge is ',charge))
    //     .catch(error => console.error('Error detected:',error));

    //   payarc.customers.list({
    //     limit: 3
    // })
    // .then((response) => {
    //     const { customers = [] } = response;
    //     console.log('Customers:', customers);
    //     console.log(customers[0].card.data);
    // })
    // .catch(error => console.error(error));

    //   payarc.customers.retrieve('cus_4DPNMVjxMpPPVnjA')
    // .then((customer) => {
    //     customer.charges.create(
    //     {
    //         amount:7788,
    //         sec_code: 'WEB',
    //         source: {
    //             account_number:'123432575352',
    //             routing_number:'123345349',
    //             first_name: 'FirstName III',
    //             last_name:'LastName III',
    //             account_type: 'Personal Savings',
    //         }
    //     }
    //    ).then((ex:any)=>{console.log('Error detected:', ex)})
    // })

    // payarc.charges.retrieve('DEg7aGEEAdEGe0d9')
    //   .then(charge => { charge.createRefund({}) })
    //   .catch(error => console.error('Error detected:', error))

    // payarc.batches.listReportsByAgent({
    //     from_date: '2024-09-01',
    //     to_date: '2024-10-31'
    // })
    //   .then((result) => {
    //     console.log("Result", result);
    //   })
    //   .catch((error) => console.error("Error:", error));

    payarc.batches.listReportDetailsByAgent({
        // from_date: '2024-09-01',
        // to_date: '2024-10-31',
        merchant_account_number: '700100000084879',
        reference_number: '633103040001',
        date: '2024-09-04'
    })
      .then((result) => {
        console.log("Result", JSON.stringify(result, null, '\t'));
      })
      .catch((error) => console.error("Error:", error));

    //JSON.stringify(result, null, '\t')
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}

test();
