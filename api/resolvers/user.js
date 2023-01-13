const mongoose = require('mongoose');
module.exports = {
    cart: async (parent, _, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }

        return await models.CartItem.find({user: mongoose.Types.ObjectId(user.id)});
    },
    shippingDetails: async (parent, _, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }

        return await models.ShippingDetails.findOne({user: mongoose.Types.ObjectId(user.id)});
    },
};
