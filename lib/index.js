'use strict';

const msrest = require('ms-rest');
const msRestAzure = require('ms-rest-azure');
const AzureServiceClient = msRestAzure.AzureServiceClient;

const clientId = process.env['CLIENT_ID'];
const secret = process.env['APPLICATION_SECRET'];
const domain = process.env['DOMAIN']; //also known as tenantId
const subscriptionId = process.env['AZURE_SUBSCRIPTION_ID'];

const filter = require('./filter');


function getPriceSheet(conf, callback) {
    return msRestAzure.loginWithServicePrincipalSecret(clientId, secret, domain)
    .then((creds) => {
        const client = new AzureServiceClient(creds);

        const offerDurableId = `MS-AZR-${conf['offer-durable-id']}`;
        const currency = conf['currency'];
        const locale = conf['locale'];
        const regionInfo = conf['region-info'];
    
        const url = `https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Commerce/RateCard?api-version=2015-06-01-preview&$filter=OfferDurableId+eq+\'${offerDurableId}\'+and+Currency+eq+\'${currency}\'+and+Locale+eq+\'${locale}\'+and+RegionInfo+eq+\'${regionInfo}\'`;
        const options = {
            method: 'GET',
            url, 
            headers: {
              'user-agent': 'AzurePricesheetFinder/1.0'
            }
        }
        return client.sendRequest(options);
    })
    .then((result) => {
        return callback(null, filter(result));
    })
    .catch((err) => {
        return callback(err);
    });
}

module.exports = getPriceSheet;