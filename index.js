'use strict';

const aipf = require('./lib');

const minimist = require('minimist');
const csvWriter = require('csv-write-stream');
const Joi = require('joi');
const fs = require('fs');

const args = minimist(process.argv.slice(2));
const writer = csvWriter()
const schema = {
    "offer-durable-id": Joi.string().required(),
    "currency": Joi.string().required(),
    "locale": Joi.string().required(),
    "region-info": Joi.string().required()
};

Joi.validate(args, schema, (err, conf) => {
    if (err) {
        // throw new Error(err);
    }

    return aipf(conf, (error, data) => {
        if (error) {
            throw new Error(error);
        }

        writer.pipe(fs.createWriteStream('output.csv'))

        data.Meters.forEach(record => {
            writer.write(record);
        });

        writer.end()
    });
});