'use strict';

const aipf = require('./lib');
const minimist = require('minimist');
const csvWriter = require('csv-write-stream');
const Joi = require('joi');

const args = minimist(process.argv.slice(2));
const schema = {
    "subscription-id": Joi.string().required(),
    "offer-durable-id": Joi.string().required(),
    "currency": Joi.string().required(),
    "locale": Joi.string().required(),
    "region-info": Joi.string().required()
};

Joi.validate(args, schema, (err, value) => {
    if (err) {
        throw new Error(err);
    }

    return aipf(value, (error, prices) => {
        if (error) {
            throw new Error(error);
        }
        console.log(prices);
    });
});