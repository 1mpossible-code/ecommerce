const mongoose = require('mongoose');
module.exports = {
    cart: async (parent, _, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }
        // Check if the cart belongs to the current user
        if (String(parent._id) !== user.id && !(await models.User.findById(user.id)?.isAdmin)) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }

        // Find all cartItems that are not ordered yet for the current user
        return await models.CartItem.find({user: parent.id, ordered: false});
    },
    shippingDetails: async (parent, _, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }

        // Check if the shipping details belong to the current user
        if (String(parent._id) !== user.id && !(await models.User.findById(user.id)?.isAdmin)) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }

        return await models.ShippingDetails.findOne({user: mongoose.Types.ObjectId(parent.id)});
    },
    orders: async (parent, _, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }
        // Check if the orders belong to the current user or if the current user is an admin
        if (String(parent._id) !== user.id && !(await models.User.findById(user.id)?.isAdmin)) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }

        return await models.Order.find({user: parent.id});
    },
};
