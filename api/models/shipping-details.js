const mongoose = require('mongoose');
const shippingDetailsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
});

const ShippingDetails = mongoose.model('ShippingDetails', shippingDetailsSchema);
module.exports = ShippingDetails;