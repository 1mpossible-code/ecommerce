module.exports = {
    user: async (cartItem, _, {models}) => {
        return await models.User.findById(cartItem.user);
    },
    product: async (cartItem, _, {models}) => {
        return await models.Product.findById(cartItem.product);
    },
};