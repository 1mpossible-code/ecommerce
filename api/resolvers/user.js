module.exports = {
    cart: async (user, _, {models}) => {
        return await models.CartItem.find({user: user._id, ordered: false});
    },
    shippingDetails: async (user, _, {models}) => {
        return await models.ShippingDetails.findOne({user: user._id}, {}, {sort: {createdAt: -1}});
    },
    orders: async (user, _, {models}) => {
        return await models.Order.find({user: user._id});
    },
};
