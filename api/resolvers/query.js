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
    orders: async (_, {userID}, {models, user}) => {
        if (!user.id) {
            throw new AuthenticationError('You are not authenticated.');
        }

        const isAdmin = await models.User.findById(user.id)?.isAdmin;
        if (userID && !isAdmin) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        } else if (userID && isAdmin) {
            try {
                return await models.Order.find({user: userID});
            } catch (err) {
                throw new Error('Invalid user ID.');
            }
        }
        return await models.Order.find();
    },
    order: async (_, {id}, {models, user}) => {
        if (!user.id) {
            throw new AuthenticationError('You are not authenticated.');
        }
        // Check if order belongs to user or if user is admin
        const order = await models.Order.findById(id);
        if (String(order.user) !== user.id && !(await models.User.findById(user.id))?.isAdmin) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }
        return await models.Order.findById(id);
    },
};