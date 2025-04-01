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

async function test(): Promise<void> {
  try {
    // payarc.splitCampaigns.getAll()
    //   .then((res) => { console.log('Campaigns', res); })

    // payarc.splitCampaigns.create({
    //   name: 'Mega bonus',
    //   description: "Compliment for my favorite customers",
    //   notes: "Only for VIPs",
    //   base_charge: 33.33,
    //   perc_charge: '7.77',
    //   is_default: '0',
    //   accounts: []
    // })
    //   .then((res) => { console.log('Campaigns created', res); })
    //   .catch((erro) => { console.log('We have a problem ', erro); })

    payarc.splitCampaigns.retrieve('cmp_njq0vmgzy0ela96w')
      .then((res) => { console.log('Campaigns details:', res); })
      .catch((erro) => { console.log('We have a problem ', erro); })

    // payarc.splitCampaigns.update('cmp_njq0vmgzy0ela96w', { notes: 'New version of notes' })
    //   .then((res) => { console.log('Updated campaign details:', res); })
    //   .catch((erro) => { console.log('We have a problem ', erro); })

    // payarc.splitCampaigns.retrieve('cmp_njq0vmgzy0ela96w')
    // .then((campaign)=>{
    //     campaign.update({notes:'Internal modifications'}).then((res:any)=>{console.log('I am updated note', res);})
    // })
    // .catch((erro)=>{console.log('We have a problem ', erro);})

    //JSON.stringify(result, null, '\t')
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}

test();
