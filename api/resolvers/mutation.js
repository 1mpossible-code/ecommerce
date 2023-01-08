module.exports = {
    createProduct: async (_, {name, description, price, quantity}, {models}) => {
        return await models.Product.create({name, description, price, quantity});
    },
    updateProduct: async (_, {id, name, description, price, quantity}, {models}) => {
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
    deleteProduct: async (_, {id}, {models}) => {
        try {
            await models.Product.findByIdAndDelete(id);
            return true;
        } catch (e) {
            return false;
        }
    },
};