const mongoose = require('mongoose');
const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: mongoose.Schema.Types.Number,
        default: 1,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;