const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    shippingDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShippingDetails',
        required: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;