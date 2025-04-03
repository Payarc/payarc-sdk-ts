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

    //   payarc.customers.list({
    //     limit: 3
    // })
    // .then((response) => {
    //     const { customers = [] } = response;
    //     console.log('Customers:', customers);
    //     console.log('Last customer:', customers[0]);
    //     console.log(customers[0].card.data);
    //     console.log(customers[0].bank_account.data);
    // })
    // .catch(error => console.error(error));

    // payarc.customers.retrieve('cus_PxMADVnApDnxV4nN')
    // .then((customer) => {
    //    customer.bank_accounts.create({
    //         account_number:'123432876',
    //         routing_number:'021000021',
    //         first_name: 'Test2',
    //         last_name:'Account',
    //         account_type: 'Personal Checking',
    //         sec_code: 'WEB'
    //     }).then((res:any)=>{
    //         console.log('result from bank account is ', res);
    //     })
    // })
    // .catch(error => console.error(error));

    // payarc.customers.retrieve('cus_PxMADVnApDnxV4nN')
    // .then((customer) => {
    //    console.log('customer is ', customer);
    // })
    // .catch(error => console.error(error));

    //   payarc.charges.create({
    //     amount:1299,
    //     currency: 'usd',
    //     source: {
    //         //card_id: 'card_mMPL0211yyym0vyN',
    //         customer_id: 'cus_PxMADVnApDnxV4nN',
    //     }
    // })
    // .then(charge => console.log('Success the charge is ',charge))
    // .catch(error => console.error('Error detected:',error))

    //   payarc.charges.create({
    //     amount:1391,
    //     currency: 'usd',
    //     source: {
    //         customer_id: 'cus_PxMADVnApDnxV4nN',
    //     }
    // })
    // .then(charge => console.log('Success! The charge is:', charge))
    // .catch(error => console.error('Error detected:', error));

    // payarc.customers.retrieve('cus_PxMADVnApDnxV4nN')
    //   .then((customer) => {
    //     customer.charges.create(
    //       {
    //         amount: 699,
    //         sec_code: 'WEB',
    //         source: {
    //           bank_account_id: 'bnk_L5Ja4dkad6aK63jD'
    //         }
    //       }
    //     ).then((ex:any) => { console.log('Charge by Bank account ID:', ex) })
    //   })

    //       payarc.customers.retrieve('cus_PxMADVnApDnxV4nN')
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
    //    ).then((ex: any)=>{console.log('Charge by Bank account ID:', ex)})
    // })

  //   payarc.charges.create({
  //     amount: 655, // Amount in cents
  //     currency: 'usd', // Currency code (e.g., 'usd')
  // source:{
  //     card_number: '4012000098765439', // Payment source (e.g., credit card number)
  //     exp_month: '03',  //Credit card attributes 
  //     exp_year: '2025', //Credit card attributes 
  //     }
  // })
  //     .then(charge => console.log('Success the charge is ',charge))
  //     .catch(error => console.error('Error detected:',error));

    // payarc.charges.list({})
    //   .then(charges => console.log(charges))
    //   .catch(error => console.error(error));

      // payarc.charges.retrieve('ch_DoBnOnyRBWnWXOyW')
      // .then(charge => console.log('Success! The charge is:', charge))
      // .catch(error => console.error('Error detected:', error));

      // payarc.charges.retrieve('ach_deD08AGADDDGEg9a')
      // .then(charge => console.log('Success the charge is ',charge))
      // .catch(error => console.error('Error detected:',error))

      // payarc.charges.retrieve('ach_deD08AGADDDGEg9a')
      // .then((charge) => {
      //     charge.createRefund({
      //         reason: 'requested_by_customer',
      //         description: 'The customer returned the product'
      //     }).then((obj:any) => {
      //         console.log("Refund successful:", obj);
      //     }).catch((error:any) => console.error('Error detected:', error));
      // })
      // .catch(error => console.error('Error detected:', error));

    //   payarc.charges.createRefund('ch_BoLWODRbBBnMBOXy', {
    //     reason: 'requested_by_customer',
    //     description: 'The customer returned the product'
    // }).then((obj) => {
    //     console.log("Refund successful:", obj);
    // }).catch(error => console.error('Error detected:', error));

    // payarc.charges.retrieve('ach_dAe7gEGe7eEG9aD0')
    //   .then(charge => {
    //     charge.createRefund({}).then((obj: any) => {
    //       console.log("Refund successful:", obj);
    //     }).catch((error: any) => console.error('Error detected:', error));
    //   })
    //   .catch(error => console.error('Error detected:', error))

    // payarc.charges.createRefund('ach_dAe7gEGe7eEG9aD0', {})
    //   .then(ch => console.log('Refunded with', ch))
    //   .catch(error => console.error('Error detected:', error))

    //JSON.stringify(result, null, '\t')
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}

test();
