module.exports = {
    user: async (cartItem, _, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }
        return await models.User.findById(cartItem.user);
    },
    product: async (cartItem, _, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }
        return await models.Product.findById(cartItem.product);
    }
};