const {gql} = require('apollo-server-express');

module.exports = gql`
    type Product {
        id: ID!
        name: String!
        description: String!
        price: Float!
        quantity: Int!
    }
    type Query {
        hello: String
        products: [Product!]!
        product(id: ID!): Product!
    }
    type Mutation {
        createProduct(name: String!, description: String!, price: Float!, quantity: Int!): Product!
    }
`;