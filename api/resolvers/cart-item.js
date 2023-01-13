module.exports = {
    user: async (cartItem, _, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }
        // Check if the cartItem belongs to the current user
        if (cartItem.user.toString() !== user.id) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }
        return await models.User.findById(cartItem.user);
    },
    product: async (cartItem, _, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }
        return await models.Product.findById(cartItem.product);
    },
};