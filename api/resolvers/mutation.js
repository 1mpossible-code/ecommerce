const models = require('../models');

module.exports = {
    createProduct: async (_, {name, description, price, quantity}) => {
        return await models.Product.create({name, description, price, quantity});
    },
};