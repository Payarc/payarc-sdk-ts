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
  //bearerToken,
  disputeCaseBearerToken,
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

    // payarc.splitCampaigns.retrieve('cmp_njq0vmgzy0ela96w')
    //   .then((res) => { console.log('Campaigns details:', res); })
    //   .catch((erro) => { console.log('We have a problem ', erro); })

    // payarc.splitCampaigns.update('cmp_njq0vmgzy0ela96w', { notes: 'New version of notes' })
    //   .then((res) => { console.log('Updated campaign details:', res); })
    //   .catch((erro) => { console.log('We have a problem ', erro); })

    // payarc.splitCampaigns.retrieve('cmp_njq0vmgzy0ela96w')
    // .then((campaign)=>{
    //     campaign.update({notes:'Internal modifications'}).then((res:any)=>{console.log('I am updated note', res);})
    // })
    // .catch((erro)=>{console.log('We have a problem ', erro);})

    // payarc.disputes.list()
    // .then((result) => { console.log("Your disputes are:", result) })
    // .catch((erro) => { console.log('We have a problem ', erro) })

    payarc.disputes.retrieve('dis_V0B9ARbWRMB1AMRw')
      .then((result) => { console.log("Your dispute is:", result);
        console.log("Your file is:", result.data.evidence);
       })
      .catch((erro) => { console.log('We have a problem ', erro) })


    // const DocumentDataBase64 = "iVBORw0KGgoAAAANSUhEUgAAAIUAAABsCAYAAABEkXF2AAAABHNCSVQICAgIfAhkiAAAAupJREFUeJzt3cFuEkEcx/E/001qUQ+E4NF48GB4BRM9+i59AE16ANlE4wv4Mp5MjI8gZ+ONEMJBAzaWwZsVf2VnstPZpfb7STh06ewu5JuFnSzQ8d5vDfiLa3sHcHiIAoIoIIgCgiggitwbWM/f2vniTe7NoIZ7Dz9Y0X0qy7NHYfbLtn6dfzOoYXPlUl4+IIgCooGXj10ngzM77p81vVmY2Y9vL+xi9Tn4f41HYVZYx3Wb3yws9oWBlw8IooAgCgiigCAKCKKAIAoIooAgCoikGU3nqpvy3qesPvv6+/2+LZfLpHUcsrrPD0cKCKKAIAoIooAgCgiigCAKCOecs7q3iJXbZDLZWVaWZfR4733lLbfZbBbchzZvvV4vy+PmSAFBFBBEAUEUEEQBQRQQRAFR5DzfD81FxMxVpMg9l3HT938fjhQQRAFBFBBEAUEUEEQBQRQQRe5z7SptnYejGkcKCKKAIAoIooAgCgiigCAKiKQoYj6bMB6Pd8aMRqPoz22kfCalzfmXm45nDoIoIIgCgiggiAKCKCCIAiJrFKnfTxHS9vdX5P7+ibZwpIAgCgiigCAKCKKAIAoIooDomNl2352hc+WY3+NYzyf2c345V3EyGNmdwevo8anbr3Lbfu/j+9fndrH69Ofv+48+WtF9JuM4UkAQBQRRQBAFBFFAEAUEUUBUfo9m6jUPzjl7eWr26vRyWVmW9u59GT2+Suo1B4vFImn8/4ojBQRRQBAFBFFAEAUEUUAQBUTHe7/3eorUeYrQ9RSprmP/UtZ/6OP/xfUUqI0oIIgCgiggiqY36Ddz25x/uZZ1PXmcNj60H6H1H/p4sV1F/VvjZx84HJx9IFrl733wexy3U/b3FO7ogR0dD7OsezqdVt4/HFZvNzQ+t9T9C40P6ty9erElfEKsbblnDHNrekYzFu8pIIgCgiggiAKCKCAqzz5Ccr+7T3133fb1DG0//ro4UkAQBQRRQBAFBFFAEAXEb3wL3JblytFeAAAAAElFTkSuQmCC"

    // payarc.disputes.addDocument('dis_V0B9ARbWRMB1AMRw', { DocumentDataBase64: DocumentDataBase64, text: 'It is the true true' })
    //   .then((result) => { console.log("Your result is:", result) })
    //   .catch((erro) => { console.log('We have a problem ', erro) })

    //JSON.stringify(result, null, '\t')
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}

test();
