module.exports = {
    user: async (order, _, {models}) => {
        return await models.User.findById(order.user._id);
    },
    shippingDetails: async (order, _, {models}) => {
        return await models.ShippingDetails.findById(order.shippingDetails._id);
    },
    items: async (order, _, {models}) => {
        return await models.CartItem.find({_id: {$in: order.items}});
    },
};
