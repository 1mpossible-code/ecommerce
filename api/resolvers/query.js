const models = require('../models');
const {AuthenticationError, ForbiddenError} = require('apollo-server-express');
const {isAdmin, isManager, isAuthenticated} = require('../services/User');

module.exports = {
    products: async () => {
        return await models.Product.find();
    },
    product: async (_, {id}) => {
        return await models.Product.findById(id);
    },
    me: async (_, __, {models, user}) => {
        if (!isAuthenticated(user)) {
            throw new AuthenticationError('You are not authenticated.');
        }
        return await models.User.findById(user.id);
    },
    users: async (_, __, {models, user}) => {
        if (!await isManager(models, user)) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }
        return await models.User.find();
    },
    user: async (_, {id}, {models, user}) => {
        if (!await isManager(models, user)) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }
        try {
            return await models.User.findById(id);
        } catch (e) {
            throw new Error('User not found.');
        }
    },
    orders: async (_, __, {models, user}) => {
        if (!await isManager(models, user)) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }
        return await models.Order.find();
    },
    order: async (_, {id: orderId}, {models, user}) => {
        if (isAuthenticated(user)) {
            throw new AuthenticationError('You are not authenticated.');
        }
        // Check if order belongs to user or if user is admin
        const order = await models.Order.findById(id);
        if (String(order.user) !== user.id && !await isAdmin(models, user)) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }
        return await models.Order.findById(id);
    },
};