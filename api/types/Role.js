const {GraphQLScalarType} = require('graphql');
module.exports = new GraphQLScalarType({
    name: 'Role',
    description: 'Role of a user',
    serialize(value) {
        if (value === 'user') {
            return 'user';
        } else if (value === 'admin') {
            return 'admin';
        } else if (value === 'manager') {
            return 'manager';
        }
        throw new Error('Invalid role.');
    },
    parseValue(value) {
        if (value === 'user') {
            return 'user';
        } else if (value === 'admin') {
            return 'admin';
        } else if (value === 'manager') {
            return 'manager';
        }
        throw new Error('Invalid role.');
    },
    parseLiteral(ast) {
        if (ast.value === 'user') {
            return 'user';
        } else if (ast.value === 'admin') {
            return 'admin';
        } else if (ast.value === 'manager') {
            return 'manager';
        }
        throw new Error('Invalid role.');
    },
});