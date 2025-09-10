/**
 * Application Status Example - TypeScript SDK
 * This example demonstrates the same functionality as the PHP version
 * Uses environment variables with fallbacks (following SDK documentation pattern)
 */

import Payarc from '../index';

// Load environment variables (optional)
import * as dotenv from 'dotenv';
dotenv.config();
const bearerTokenPayarc: string | undefined = process.env.PAYARC_KEY || '';
const baseUrl: string | undefined = process.env.PAYARC_ENV || '';
const apiVersion: string = '/v1/'; //
const bearerTokenAgent: string | undefined = process.env.PAYARC_AGENTKEY || '';
const version = '1';
// Initialize SDK with environment variables or fallback values

const payarc = new Payarc(
    bearerTokenPayarc,
    baseUrl,
    apiVersion,
    version,
    bearerTokenAgent
);

/**
 * Example 1: Get status for specific application (matches PHP SDK pattern)
 * PHP equivalent: $payarc->applications->lead_status('2m5Vnl8L5md8ldaY')
 */
async function getApplicationStatus(id : string) {

    try {
        const applicationList = await payarc.applications.list();
        // applicationList[0] or id or applicationList[0].object_id
        const status = await payarc.applications.status(applicationList[0]);
        console.log("Application Status:", JSON.stringify(status, null, 2));

    } catch (error: any) {
        console.log("Application Status Error:", error.message);
    }
}


// Run
getApplicationStatus('dpjlrewqlrevz583');
