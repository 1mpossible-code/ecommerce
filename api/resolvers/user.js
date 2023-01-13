const mongoose = require('mongoose');
module.exports = {
    cart: async (parent, _, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }

        // Find all cartItems that are not ordered yet for the current user
        return await models.CartItem.find({user: user.id, ordered: false});
    },
    shippingDetails: async (parent, _, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }

        return await models.ShippingDetails.findOne({user: mongoose.Types.ObjectId(user.id)});
    },
};
