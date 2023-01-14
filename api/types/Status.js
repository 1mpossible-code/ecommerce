const {GraphQLScalarType} = require('graphql');
module.exports = new GraphQLScalarType({
    name: 'Status',
    description: 'Status of an order',
    serialize(value) {
        if (value === 'pending') {
            return 'pending';
        } else if (value === 'processing') {
            return 'processing';
        } else if (value === 'shipped') {
            return 'shipped';
        } else if (value === 'delivered') {
            return 'delivered';
        } else if (value === 'cancelled') {
            return 'cancelled';
        }
        throw new Error('Invalid status.');
    },
    parseValue(value) {
        if (value === 'pending') {
            return 'pending';
        } else if (value === 'shipped') {
            return 'shipped';
        } else if (value === 'delivered') {
            return 'delivered';
        } else if (value === 'cancelled') {
            return 'cancelled';
        }
        throw new Error('Invalid status.');
    },
    parseLiteral(ast) {
        if (ast.value === 'pending') {
            return 'pending';
        } else if (ast.value === 'shipped') {
            return 'shipped';
        } else if (ast.value === 'delivered') {
            return 'delivered';
        } else if (ast.value === 'cancelled') {
            return 'cancelled';
        }
        throw new Error('Invalid status.');
    },
});