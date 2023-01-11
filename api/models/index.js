const Product = require('./product');
const Order = require('./order');
const User = require('./user');
const ShippingDetails = require('./shipping-details');
const CartItem = require('./cart-item');

const models = {
    Product,
    Order,
    User,
    ShippingDetails,
    CartItem,
};

module.exports = models;