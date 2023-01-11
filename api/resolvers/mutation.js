const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {AuthenticationError, ForbiddenError} = require('apollo-server-express');
const {Error} = require('mongoose');
require('dotenv').config();

module.exports = {
    createProduct: async (_, {name, description, price, quantity}, {models, user}) => {
        if (!(await models.User.findById(user.id))?.isAdmin) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }
        return await models.Product.create({name, description, price, quantity});
    },
    updateProduct: async (_, {id, name, description, price, quantity}, {models, user}) => {
        if (!(await models.User.findById(user.id))?.isAdmin) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }
        return await models.Product.findOneAndUpdate({_id: id},
            {
                $set: {
                    name,
                    description,
                    price,
                    quantity,
                },
            },
            {new: true});
    },
    deleteProduct: async (_, {id}, {models, user}) => {
        if (!(await models.User.findById(user.id))?.isAdmin) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }
        try {
            await models.Product.findByIdAndDelete(id);
            return true;
        } catch (e) {
            return false;
        }
    },
    signup: async (_, {email, firstName, lastName, password}, {models}) => {
        email = email.trim().toLowerCase();
        const hashed = await bcrypt.hash(password, 10);
        try {
            const user = await models.User.create({
                email,
                firstName,
                lastName,
                password: hashed,
            });
            return jwt.sign({id: user._id}, process.env.JWT_SECRET);
        } catch (e) {
            console.log(e);
            throw new Error('Error creating account.');
        }
    },
    signin: async (_, {email, password}, {models}) => {
        email = email.trim().toLowerCase();

        const user = await models.User.findOne({email});
        if (!user) {
            throw new AuthenticationError('Error signing in.');
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new AuthenticationError('Error signing in.');
        }

        return jwt.sign({id: user._id}, process.env.JWT_SECRET);
    },
    setToCart: async (_, {productId, quantity}, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }
        if (quantity < 0) {
            throw new Error('Quantity must be a positive integer.');
        }

        const product = await models.Product.findById(productId);
        if (!product) {
            throw new Error('Invalid product.');
        }

        const cartItem = await models.CartItem.findOne({user: user.id, product: productId});
        if (cartItem && quantity === 0) {
            await models.CartItem.findByIdAndDelete(cartItem.id);
            return true;
        }
        if (!cartItem && quantity === 0) {
            throw new Error('Item not in cart.');
        }

        if (product.quantity === 0) {
            throw new Error('Product out of stock.');
        }
        if (quantity > product.quantity) {
            return false;
        }

        try {
            await models.CartItem.findOneAndUpdate(
                {user: user.id, product: productId},
                {$set: {quantity}},
                {new: true, upsert: true});
            return true;
        } catch (e) {
            throw new Error('Error adding to cart.');
        }
    },
};