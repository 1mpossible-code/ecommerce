const {gql} = require('apollo-server-express');

module.exports = gql`
    scalar DateTime
    type Product {
        id: ID!
        name: String!
        description: String!
        price: Float!
        quantity: Int!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type Query {
        hello: String
        products: [Product!]!
        product(id: ID!): Product!
    }
    type Mutation {
        createProduct(name: String!, description: String!, price: Float!, quantity: Int!): Product!
        updateProduct(id: ID!, name: String, description: String, price: Float, quantity: Int): Product!
        deleteProduct(id: ID!): Boolean!
    }
`;