module.exports = {
    user: async (order, _, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }
        // Check if the order belongs to the current user or if the current user is an admin
        if (String(order.user) !== user.id || await models.User.findById(user.id)?.isAdmin) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }

        return await models.User.findById(order.user._id);
    },
    shippingDetails: async (order, _, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }
        // Check if the order belongs to the current user or if the current user is an admin
        if (String(order.user) !== user.id || await models.User.findById(user.id)?.isAdmin) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }

        return await models.ShippingDetails.findById(order.shippingDetails._id);
    },
    items: async (order, _, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }
        // Check if the order belongs to the current user or if the current user is an admin
        if (String(order.user) !== user.id || await models.User.findById(user.id)?.isAdmin) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }

        return await models.CartItem.find({_id: {$in: order.items}});
    },
};
