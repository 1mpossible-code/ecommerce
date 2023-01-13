const models = require('../models');
const {AuthenticationError, ForbiddenError} = require('apollo-server-express');

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
    },
    users: async (_, __, {models, user}) => {
        if (!(await models.User.findById(user.id))?.isAdmin) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }
        return await models.User.find();
    },
    user: async (_, {id}, {models, user}) => {
        if (!(await models.User.findById(user.id))?.isAdmin) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }
        return await models.User.findById(id);
    },
};