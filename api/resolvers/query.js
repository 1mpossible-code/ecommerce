const models = require('../models');
const {AuthenticationError} = require('apollo-server-express');

module.exports = {
    products: async () => {
        return await models.Product.find();
    },
    product: async (_, {id}) => {
        return await models.Product.findById(id);
    },
    me: async (_, __, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }
        return await models.User.findById(user.id);
    }
};