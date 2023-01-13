const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {AuthenticationError, ForbiddenError} = require('apollo-server-express');
const {Error} = require('mongoose');
const validators = require('./mutation.validators');
require('dotenv').config();

module.exports = {
    createProduct: async (_, {name, description, price, quantity}, {models, user}) => {
        if (!(await models.User.findById(user.id))?.isAdmin) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }

        const dataValidated = validators.productValidator.validate({name, description, price, quantity});
        if (dataValidated.error) {
            throw new Error(dataValidated.error.message);
        }

        return await models.Product.create({name, description, price, quantity});
    },
    updateProduct: async (_, {id, name, description, price, quantity}, {models, user}) => {
        if (!(await models.User.findById(user.id))?.isAdmin) {
            throw new ForbiddenError('You are not authorized to perform this action.');
        }

        const dataValidated = validators.productValidator.validate({name, description, price, quantity});
        if (dataValidated.error) {
            throw new Error(dataValidated.error.message);
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
        const userByEmail = await models.User.findOne({email});
        if (userByEmail) {
            throw new Error('User already exists.');
        }

        const signupDataValidated = validators.signupValidator.validate({email, firstName, lastName, password});
        if (signupDataValidated.error) {
            throw new Error(signupDataValidated.error.message);
        }

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

        const validatedData = validators.signinValidator.validate({email, password});
        if (validatedData.error) {
            throw new Error(validatedData.error.message);
        }

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
    setShippingDetails: async (_, {firstName, lastName, number, address, city, state, zip}, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }
        const shippingDetailsValidated = validators.shippingDetailsValidator.validate({
            user: user.id,
            firstName,
            lastName,
            number,
            address,
            city,
            state,
            zip,
        });
        if (shippingDetailsValidated.error) {
            throw new Error(shippingDetailsValidated.error.message);
        }
        try {
            await models.ShippingDetails.findOneAndUpdate(
                {user: user.id},
                {$set: shippingDetailsValidated.value},
                {new: true, upsert: true});
            return true;
        } catch (e) {
            throw new Error('Error setting shipping details.');
        }
    },
    createOrder: async (_, __, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You are not authenticated.');
        }
        const cartItems = await models.CartItem.find({user: user.id});
        if (cartItems.length === 0) {
            throw new Error('Cart is empty.');
        }
        // Check if all products are in stock
        for (const cartItem of cartItems) {
            const product = await models.Product.findById(cartItem.product);
            if (product.quantity < cartItem.quantity) {
                throw new Error(`Product ${product.name} is out of stock. Only ${product.quantity} left.`);
            }
        }

        const shippingDetails = await models.ShippingDetails.findOne({user: user.id});
        if (!shippingDetails) {
            throw new Error('Shipping details not set.');
        }

        try {
            const order = await models.Order.create({
                user: user.id,
                shippingDetails: shippingDetails.id,
                items: cartItems.map((cartItem) => {
                    return cartItem._id;
                }),
                status: 'pending',
            });
            // Update cartItems to be ordered
            await models.CartItem.updateMany({user: user.id}, {$set: {ordered: true}});
            // Update product quantities
            for (const cartItem of cartItems) {
                const product = await models.Product.findById(cartItem.product);
                await models.Product.findByIdAndUpdate(product.id, {$set: {quantity: product.quantity - cartItem.quantity}});
            }
            return order;
        } catch (e) {
            throw new Error('Error creating order.');
        }
    },
};