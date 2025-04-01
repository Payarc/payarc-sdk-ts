import * as dotenv from 'dotenv';
dotenv.config();

import Payarc from '../index'

const bearerToken: string | undefined = process.env.PAYARC_KEY;
const baseUrl: string | undefined = process.env.PAYARC_ENV;
const bearerTokenAgent: string | undefined = process.env.PAYARC_AGENTKEY;
const bearerTokenWithSubagent: string | undefined = process.env.PAYARC_AGENTWITHSUBAGENTKEY;
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
  bearerTokenAgent,
);

// const payarcListExisting = new Payarc(
//   accountListExistingBearerToken || '',
//   baseUrl,
//   apiVersion,
//   version,
//   accountListExistingBearerToken || ''
// );

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

    // payarc.customers.retrieve('PxMADVnApDnxV4nN')
    //   .then((customer) => {
    //     customer.update({ description: "Senior Update Example" });
    //   })
    //   .catch(error => console.error(error));

    // payarc.customers.retrieve('PxMADVnApDnxV4nN')
    //   .then((customer) => {
    //     console.log('Customer:', customer);
    //     console.log('Customer card: ', customer.card.data);
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
    //     }).then((cc:any) => {
    //       console.log('Card added to customer:', cc);
    //       payarc.customers.retrieve('PxMADVnApDnxV4nN')
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

    // payarc.customers.delete('DPpKjVKDAjP4VnMN').then((response) => {
    //   console.log('payarc.customers.delete response = ', response);
    //   if (response) {
    //     console.log('Customer Deleted.');
    //     payarc.customers.list({
    //       limit: 3
    //     })
    //       .then((response) => {
    //         const { customers = [] } = response;
    //         console.log(customers);
    //         console.log(customers[0].customer_id);
    //         // payarc.customers.retrieve(customers[0].customer_id)
    //         //   .then((customer) => {
    //         //     console.log('Customer bank_account: ', customer.card.data);
    //         //   });
    //       })
    //       .catch(error => console.error(error));
    //   }
    // });

    // payarc.applications.list()
    //   .then((res) => { console.log('List of applications', res); })
    //   .catch((error) => { console.log('There is a problem somewhere ', error); });

    // payarc.applications.create(
    //   {
    //     "Lead": {
    //       "Industry": "cbd",
    //       "MerchantName": "TS applications",
    //       "LegalName": "Best Co in w",
    //       "ContactFirstName": "Joan",
    //       "ContactLastName": "Dhow",
    //       "ContactEmail": "contact@mail.com",
    //       "DiscountRateProgram": "interchange"
    //     },
    //     "Owners": [
    //       {
    //         "FirstName": "First",
    //         "LastName": "Last",
    //         "Title": "President",
    //         "OwnershipPct": 100,
    //         "Address": "Somewhere",
    //         "City": "City Of Test",
    //         "SSN": "4546-0034",
    //         "State": "WY",
    //         "ZipCode": "10102",
    //         "BirthDate": "1993-06-24",
    //         "Email": "nikoj@negointeresuva.com",
    //         "PhoneNo": "2346456784"
    //       }
    //     ]
    //   }

    // ).then((result) => { console.log('the result is ', result) })
    //   .catch((exep) => { console.log('We encountered an issue ', exep); })

    //     const applicant =
    // {
    //   "agentId": "",
    //     "Lead":
    //     {
    //         "Industry": "cbd",
    //         "MerchantName": "My TS Agent company",
    //         "LegalName": "Best Co in w",
    //         "ContactFirstName": "Joan",
    //         "ContactLastName": "Dhow",
    //         "ContactTitle": 'sir',
    //         "ContactEmail": "contact@mail.com",
    //         "DiscountRateProgram": "interchange",
    //         "ACHTransactions":false
    //     },
    //     "Owners": [
    //         {
    //             "FirstName": "First",
    //             "LastName": "Last",
    //             "Title": "President",
    //             "OwnershipPct": 100,
    //             "Address": "Somewhere",
    //             "City": "City Of Test",
    //             "SSN": "4546-0034",
    //             "State": "WY",
    //             "ZipCode": "10102",
    //             "BirthDate": "1993-06-24",
    //             "Email": "nikoj@negointeresuva.com",
    //             "PhoneNo": "2346456784"
    //         }
    //     ]
    // }

    // payarc.applications.listSubAgents()
    //     .then((result) => {
    //         console.log('List of sub Agents', result);
    //         if (result.length) {
    //             applicant.agentId = result[0].object_id //Add agent Id in behalf of which appicon is logged
    //             payarc.applications.create(
    //                 applicant
    //             ).then((result) => { console.log('the result is ', result) })
    //                 .catch((exep) => { console.log('We encountered an issue during creation ', exep); })
    //         }
    //     })
    //     .catch((error) => { console.log('We encountered an issue ', error); })

    // payarc.applications.retrieve('appl_wzbrmqg53k7pk469')
    //   .then((res) => { console.log('Details for applicant', res) })
    //   .catch((erro) => { console.log('We have a problem ', erro); });

    // payarc.customers.list({
    //   limit: 3
    // })
    //   .then((response) => {
    //     const { customers = [] } = response;
    //     console.log(customers);
    //   })
    //   .catch(error => console.error(error));

    // payarc.applications.update('appl_dpokzgdd05g50ml8',
    //   {
    //     "MerchantBankAccountNo": "987396827",
    //     "MerchantBankRoutingNo": "1848505",
    //     "BankInstitutionName": "Bank of something"
    //   })
    //   .then((res) => { console.log('Update for applicant', res) })
    //   .catch((erro) => { console.log('We have a problem ', erro); })

    // payarc.applications.list()
    //   .then((res) => {
    //     const applicant = res.slice(-1)[0]
    //     applicant.addDocument(
    //       {
    //         "DocumentType": "DL",
    //         "DocumentName": "sample document 1",
    //         "DocumentIndex": 12243,
    //         "DocumentDataBase64": "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAMcAAAAvCAYAAABXEt4pAAAABHNCSVQICAgIfAhkiAAAC11JREFUeF7tXV1yHDUQlsZrkjccB2K/sZwA5wSYil3FG+YEcU6AcwLMCeKcAHMCNm9U2SmcE2CfgPWbHYhZvxHsHdE9O7OZ1WpGX2tmdjA1U0VBsfppfeqv1Wq1ZL26tmVUjR81dsLNaaUHsV56Nbr4ZVhj80lTK+tf9yMz/sYoszPpS22mfZxS/6OivlfWt79EZBldHL1J+lnZXFH3l79A6qi/b85Go5MRVDYtxONQavwZUieTqaisHxN1GuveS3s+Vj7d3lBL6mOfDK7+C+uO1fXoj6PTsjY/Wd/aHBv1HcNM87fB/6Z/RleXxw98sti/sxxRpL7M6UPWHhdNdUKdUj8n4/e3b9B50nWTwxacyWJ071kdJGEQdGRe5MhQiiP1PaC+n2d9o2OlCaIuJh/VYYX3Kg+VeU71DiQTu/po+1Bp89RXh4R58+7yeNNVjkmhze2PAkxm5uPh2tYJ4eQ1GnlMMjk8dQk3vX91efQyL/fDR092jFYv6DcyDPOfqx/nuMlwRR/1viP8dovaKsTVmMMo0j/9eXF8UoZ94+SYdm7U/tXb4x98ilAIxL3e9/TbXkD9kdb6+buLo8Mgcqxv7SujuG/PZ4ZXl68/95XKfp9Y+tvfkfLamG/fvX09sMuuPtr6npbNfaQNq8wUkwbJkXSZl53w5/kjYhR/CDkerj95aoxmQ8SrTfCXGM/3t8+KVpLFkYOHQIyN/xk/R5c1rsKuTXSv9yv9Jy+VwR8R5Jkx5kekgfwEpf3/hdSLtPrKZ42ydlZh0qlzkqef7z+R6aOlF0rrXUSuojKMCc3JbkMrR9btKcn/GB1vGTl43Ppej1fJxJ2u6ZsaCrs9IscT8g015lfXI00CFtJUXcRA+sqXsScIdX9IyV79dXkMTRzhTquGnlF6l5yswLzq5X8jC/xbVWORa4/dRq8FDnCrpl3EsX4cRYZl9n5F5GhaF1w4a5TR3lGJCpiX5IJ4XaQHa1s/12wlICntCZps+LDJpU3v57791cTv1j8DwlzH72/7+ZWWSEXuhOaN7EK/KuQgQXlzDq38rn6aJkYGpE0QnXY8pALIprO2CfG5IA/Xt3dRN6g2odKGKimCVj9cXRzvl8lEpP8V20DPGhGO8MRGsYu58K8SJgJpXf0s0EiOyLg9zoxbEpVJLePJYglSvIFNCcubVe9yL8AdLupUBNjal2/MJRtxexVCXTF4oIKCbZFj0UaSo6vkGn/F0ExDlsmkxeN9JLQowLS0qMvP4wpIVKMuGVztFPm9JBevsN5ziaLo0mRsoFtk9E9Xb492M/kWrSQ2Lm2Row2DkHk1U3JkYLDV7t3vQf5hVifmQ7hY94lYvBmF3bM8S/OTEQDItTJ6oCIzjIj5LI8xaoMG900IiUrI4Q1Fcn9lG3MiGEe+vCui7Xbirth0xHOYhMxR1lob5JDuh/k8iCJ4h+OxOuVDSDb4S/HNhlHRjsjop4ZpjhwhyjQl1uRA6kCilLbrIParaSDxPzd7rvBwekAmkofH4omY8OrhNQCujTlq/e1DP4krlpGT4ve7TkySMPDygUhZCjBBz0gcOnVOJmSgjTrRkZ7JKsiHwoVGsvQQVrp1oEDIg1rJkYGAhj65vO1ayawFHPUaSAhbFmuHx+bYmKMhWBsTlFQJ/pY7VmTs4HGkDdS0clzT2Pbs0LRLRqFBgLITJIaXV+5GyJFuqDl85/XP7clErVFZSoUNtjQiV3oQBZ9sz27MBeHguUM/gSKfk8XbQA9Z0T1U0WqKzlU6H9d03rHpy7maGljgND0tO4dXmfcDy0zGrRFysHCotbOVHE3xKNv0usARrEhesMn/h1aimdQJMI+KQiRzoWB0QosCHEXKgs5RHeSQzldTY+YVqadu+77tw63qDXWSn1PwxUa/Qpk+Z61hCzubiYmSA8nBycuEWm5kRUKX52xjLghNzx368RjQTTxyADmDySQ1B0qNqeZWmTM69BUFeVBy8Ol7qI76COLPraJ8qKu3r5/5GnJaazAd3sqC9abQIwocKg/aNuqSsMIuqTFFz4C8roL9QlMGIyXeEHF/K5EDOBi15wvdn0mNpESP/eSg1qTL9Qe/EcvbygaIWmRUgR2A10Y82CUhxaDkPkpL196lvMjyY+SQW+fE/W0uZX0Kvy8bItSQFbl7EgKUlYXIQQ3AyYL5zrBJ/RA6RTNg/wvkSK0uctcDSuwrG5MUR4lyVLHQKLECyRG8oknGXwc5CmP/RY2jim6zH1QE8Y0xNDQoIZ5gk++drzIFAjFRHJtHI1UfVnfsJmgVtypELpR40n2WdyJyBdCVY+bSCtIB6nYsKloVKk/ZWFHCAXiVRshQRZG6v4LsYKdxROUK2RegbUvHDMzFtAhMjqJUj6LO0HQHO9UCvV8ilQc9bZWsHIlrhYZoS2bFN8Fo6FiKCTpHRb49qsAh5EBX5cbGzOcc6JLNAPkmcbpU47fcuMrM6SacmNeQPFJyoCHiEm44w7fW3g3K6UrqgJEhdCXN5KjiVoWQQ4IreoYibVNEjglQes++ND8zkcJ7zXacWrLUQ/KsbfGdZe/FqmwMUnJwPdSCOgkCKLNkUpM+PPf1V9e26bKUET0GsWhyJKsy/rjFiPZs35ZdUU4x5Lsw3qRP7jvJrZKsHB8m1wyVig5indzwSr6IsmCpSVJC3Xcqgft/On1tAShpqw55YrMZ8jJFEDkqXMxCN5TouUoDc5Q02Qo5ZB7I5I0CE73MHwpOrmLcPqUVlQ0kRIxMBwLJIVD/kqKF9zmkoNQjTtJKCDlSK0cGA8gly8sKJglyFakbVCMkrZFDmhNnjRkKobtwyty0NslR6GvXGAUS60gFcuD7glQqSepDRUUR42BXaGPlSIzO4g3l1JtpkxylacYtgFJp5ZAqbwgJ27wh2RY5JrgunSzqhZy8wWqFHOgTNmhYt7JZzDUQorRZdUlYF4382WNDw7p1YtLWniMbg9TwBI/dCo60QA5zFr8fbyInual7xZt+7827YECsipXIgbsA3rT4ovEs2pJmcrS1ckwJMnkeiVaQhnTBsf+DyMEKQ88vDqVXK+cnGCdG7aDQ4BH5Q8khSEvnoUE31xonCGGitek3/OKhOPWocNzJNYibQQMulnM+YHLwQ8YSt8EeICsdvXC9g6wYdl1WvKV7vQEyiU5gU6uAhK1DySGIJnkP/ZBVsC5M0DOatleOGRcr4A68G1NzFtG13aLzERE5uIP0kO5QsLydU2hsz/UQMqIE+TKpAvLhFepmndPh0G42+CbJgaanoHe8UWzS+WBM/FeSJ41e03zsZvNx18gxJUmlp6TMmdbRge8uu5gcLFxite4v78TG7BQ8XJA8C6NVPKiDFLaiJAoxeW7F+RQQb/gjOhCy+04iYJ6P/rbH0AeaUx7seU96Hcf/XKhPRtfvECZaD8Z/3wzyq3dicJTp+/p0veJYpa6vP/R3Sxc3iwxnsjXQ9GzTWA/Qm4NB5HAJnvwhk5ubYYjbhAJRVC75IzDj8Qo66Kr92fXRBD40SleHfMkf3lle7reFSR1jqNIGX5zje+C+d4vL+qiNHFUGcpfrSg4sQy793GVs7rrsHTkqziAepAi7xlpRvK56BQQ6clQAT3LbMfTQr4J4XdWKCHTkqACgIMXlmkKhUEZoBXG6qjUj0JGjAqBw+Ba4s1FBjK5qQwh05AgEVnDoF/TwQaBYXbUaEejIEQgm+qRN3Yd+geJ21QIQ6MgRABr6+Bw3LbmzESBKV6VBBDpyBICLhm9D87QCROqqNIBARw4hqJJDP/RVDKEIXfEFIdCRQwi04Omg4DsbQpG64g0h0JFDAOwi72wIxOqKNoSA5pRlX9uUtUkPSb+G337ytXdXf+fMV3rZDsIh9O7KXcXm/yj3v5rg2VF0wF/HAAAAAElFTkSuQmCC"
    //       }
    //     ).then((res:any) => { console.log('Documents added are', res) })
    //   })
    //   .catch((error) => { console.log('There is a problem somewhere ', error); })

    // payarc.applications.list()
    //   .then((res) => {
    //     const applicant = res.slice(-1)[0];
    //     applicant.retrieve().then((details:any) => { 
    //       console.log('Documents for applicant are', details.Documents); 
    //     })
    //   })
    //   .catch((error) => { console.log('There is a problem somewhere ', error); })

    // payarc.applications.list()
    // .then((res) => {
    //     const applicant = res.slice(-1)[0];
    //     applicant.retrieve().then((details:any) => {
    //         const document = (details.Documents && details.Documents.data && details.Documents.data.length) ? details.Documents.data[0] : null
    //         if (document) {
    //             document.delete().then((res:any) => { console.log('Doc deleted with response', res); })
    //         }
    //     })
    // })
    // .catch((error) => { console.log('There is a problem somewhere ', error); })

    // payarc.applications.list()
    // .then((res) => {
    //     console.log('List of applications', res);
    // })
    // .catch((error) => { console.log('There is a problem somewhere ', error); })

    payarc.applications.deleteDocument('doc_rmv039elode5nboz').then((res)=>{console.log('Document is removed ', res)})

    //JSON.stringify(result, null, '\t')
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}

test();
