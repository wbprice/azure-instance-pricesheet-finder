# azure-instance-pricesheet-finder

This is a tool for fetching hourly usage rates for non-Windows Azure instances in the US-East region.

## Setup

```
git clone https://github.com/wbprice/azure-instance-pricesheet-finder
cd azure-instance-pricesheet-finder
npm install
```

Several environment variables need to be defined for this tool to work.
```
export CLIENT_ID=<your-client-id>
export APPLICATION_SECRET=<your-application-secret>
export DOMAIN=<your-domain>
export AZURE_SUBSCRIPTION_ID=<your-azure-subscription-id>
```

To find out what these variables are for you, follow this [guide](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-create-service-principal-portal)

## Usage Example

```
node index.js 
    --offer-durable-id 0017p 
    --currency USD 
    --locale en-US 
    --region-info US
```
Results in:

```
// output.csv
HourlyRate,InstanceType
0.02,A0 VM
0.4,std.d4v2promo
0.78,A10 VM
0.146,std.d2v
0.532,std.e8v3
1.482,std.d14v2
0.185,std.d11
...
```
