const Joi = require('joi');
const {ObjectId} = require('mongodb');
module.exports = {
    productValidator: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(0).required(),
        quantity: Joi.number().min(0).required(),
    }),
    signinValidator: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
    signupValidator: Joi.object({
        email: Joi.string().email().max(80).required(),
        firstName: Joi.string().max(80).required(),
        lastName: Joi.string().max(80).required(),
        password: Joi.string().min(8).max(80).required(),
    }),
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