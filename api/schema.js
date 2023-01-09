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
    type Order {
        id: ID!
        products: [Product!]!
        user: User!
        shippingDetails: ShippingDetails!
        status: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type ShippingDetails {
        id: ID!
        firstName: String!
        lastName: String!
        address: String!
        city: String!
        state: String!
        zip: String!
    }
    type User {
        id: ID!
        email: String!
        firstName: String!
        lastName: String!
        password: String!
        shippingDetails: ShippingDetails
        orders: [Order!]!
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
        signup(email: String!, firstName: String!, lastName: String!, password: String!): String!
        signin(email: String!, password: String!): String!
    }
`;