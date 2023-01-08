const models = require('../models');

module.exports = {
    hello: () => 'Hello world!',
    products: async () => {
        return await models.Product.find();
    },
    product: async (_, {id}) => {
        return await models.Product.findById(id);
    },
};