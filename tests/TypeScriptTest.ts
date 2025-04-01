import * as dotenv from 'dotenv';
dotenv.config();

import Payarc from '../index'

const bearerToken: string | undefined = process.env.PAYARC_KEY;
const baseUrl: string | undefined = process.env.PAYARC_ENV;
const bearerTokenAgent: string | undefined = process.env.PAYARC_AGENTKEY;
const accountListExistingBearerToken: string | undefined = process.env.PAYARC_ACCOUNTLISTEXISTINGKEY;
const apiVersion: string = '/v1/';
const version: string = '1.0';

if (!bearerToken || !baseUrl) {
  throw new Error('Missing required environment variables.');
}

const payarc = new Payarc(
  bearerToken,
  baseUrl,
  apiVersion,
  version,
  bearerTokenAgent
);

const payarcListExisting = new Payarc(
  accountListExistingBearerToken || '',
  baseUrl,
  apiVersion,
  version,
  accountListExistingBearerToken || ''
);

async function test(): Promise<void> {
  try {
    // payarc.customers.create({
    //     name: 'Shah TS Test6',
    //     email: 'shah+ts@test6.com',
    //     cards: [
    //         {
    //             card_source: 'INTERNET',
    //             card_number: '4012000098765439',
    //             exp_month: '12',
    //             exp_year: '2025',
    //             cvv: '999',
    //             card_holder_name: 'John Doe',
    //             address_line1: '123 Main Street',
    //             city: 'Greenwich',
    //             state: 'CT',
    //             zip: '06840',
    //             country: 'US'
    //         },
    //         {
    //             card_source: 'INTERNET',
    //             card_number: '4012000098765439',
    //             exp_month: '12',
    //             exp_year: '2025',
    //             cvv: '999',
    //             card_holder_name: 'John Doe',
    //             address_line1: '123 Main Street Apt 3',
    //             city: 'Greenwich',
    //             state: 'CT',
    //             zip: '06840',
    //             country: 'US'
    //         }
    //     ]
    // }).then((obj) => {
    //     console.log("Customer created:", obj);
    // }).catch(error => console.error('Error detected:', error));

    //console.log('response: ', responseCreateCustomer);

    //   payarc.customers.update('DPpKjVKDAjM4VnMN', {
    //     name: 'Shah TS Update1',
    //     description: 'Update Example',
    //     phone: '3213213210'
    // }).then((obj) => {
    //     console.log("Customer updated successfully:", obj);
    // }).catch(error => console.error('Error detected:', error));

    // payarc.customers.retrieve('PxMADVnApDjxV4nN')
    //   .then((customer) => {
    //     customer.update({ description: "Senior Update Example" });
    //   })
    //   .catch(error => console.error(error));

    // payarc.customers.retrieve('PxMADVnApDjxV4nN')
    //   .then((customer) => {
    //     customer.cards.create({
    //       card_source: 'INTERNET',
    //       card_number: '4012000098765439',
    //       exp_month: '12',
    //       exp_year: '2025',
    //       cvv: '999',
    //       card_holder_name: 'AddByCard Create',
    //       address_line1: '222 Main Street Apt 222',
    //       city: 'Greenwich',
    //       state: 'CT',
    //       zip: '06840',
    //       country: 'US'
    //     }).then((cc) => {
    //       console.log('Card added to customer:', cc);
    //       payarc.customers.retrieve('PxMADVnApDjxV4nN')
    //         .then((customer) => {
    //           console.log('Customer:', customer);
    //           console.log('Customer card: ', customer.card.data);
    //         });
    //     });
    //   });

    // payarc.customers.retrieve('ADjPnVDNPDppVpMN')
    //   .then((customer) => {
    //     customer.bank_accounts.create({
    //       account_number: '123456789012',
    //       routing_number: '123456789',
    //       first_name: 'John II',
    //       last_name: 'Doe222',
    //       account_type: 'Personal Savings', 
    //       sec_code: 'WEB'
    //     }).then((res: any) => {
    //       console.log('Result from bank account is ', res);
    //       payarc.customers.retrieve('ADjPnVDNPDppVpMN')
    //         .then((customer) => {
    //           console.log('Customer bank_account: ', customer.bank_account.data);
    //         });
    //     })
    //   })
    //   .catch(error => console.error(error));

    payarc.customers.delete('DPpKjVKDAjP4VnMN').then((response) => {
      console.log('payarc.customers.delete response = ', response);
      if (response) {
        console.log('Customer Deleted.');
        payarc.customers.list({
          limit: 3
        })
          .then((response) => {
            const { customers = [] } = response;
            console.log(customers);
            console.log(customers[0].customer_id);
            // payarc.customers.retrieve(customers[0].customer_id)
            //   .then((customer) => {
            //     console.log('Customer bank_account: ', customer.card.data);
            //   });
          })
          .catch(error => console.error(error));
      }
    });


    //JSON.stringify(result, null, '\t')
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}

test();
