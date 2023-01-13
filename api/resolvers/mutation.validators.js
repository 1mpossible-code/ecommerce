const Joi = require('joi');
const {ObjectId} = require('mongodb');
module.exports = {
    shippingDetailsValidator: Joi.object({
        user: Joi.string().custom((value, helpers) => {
            if (!ObjectId.isValid(value)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'User ID is invalid.').required(),
        firstName: Joi.string().max(80).required(),
        lastName: Joi.string().max(80).required(),
        number: Joi.string().custom((value, helpers) => {
            // check if value is a valid phone number with country code
            if (!value.match(/^\+[1-9]\d{1,14}$/)) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'Phone number is invalid.').required(),
        address: Joi.string().max(120).required(),
        city: Joi.string().max(80).required(),
        state: Joi.string().length(2).required(),
        zip: Joi.string().length(5).required(),
    }),
};