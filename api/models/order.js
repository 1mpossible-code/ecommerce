const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    shippingDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShippingDetails',
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;