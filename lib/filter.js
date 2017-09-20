'use strict';

function shouldKeep(record) {
    return record.MeterRegion === "US East" &&
           record.MeterCategory === "Virtual Machines" &&
           !record.MeterSubCategory.match(/Windows/i)
}

function normalizeStandardNames(standardName) {
    return standardName
        .split(' ')
        .map(token => {
            if (token.indexOf('_') !== 1) {
                return token
                    .replace('Standard', 'std.')
                    .replace(/_/g, '')
                    .toLowerCase();
            }
            return token;
        })
        .join(' ');
}

function normalizeBasicNames(basicName) {
    return basicName
        .toLowerCase();
}

function removeVm(string) {
    return string.replace(' vm', '');
}

function normalizeInstanceType(instanceType) {
    if (instanceType.indexOf('Standard') !== -1) {
        return removeVm(normalizeStandardNames(instanceType));
    }
    if (instanceType.indexOf('BASIC') !== -1) {
        return removeVm(normalizeBasicNames(instanceType));
    }
    return removeVm(instanceType);
}

function mungeRecords(records, callback) {
    records.Meters = records.Meters.reduce((memo, record) => {
        if (shouldKeep(record)) {
            memo.push({
                HourlyRate: record.MeterRates['0'],
                InstanceType: normalizeInstanceType(record.MeterSubCategory)
            });
        }
        return memo;
    }, []);
    return records;
}

module.exports = mungeRecords;