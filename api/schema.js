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
    type CartItem {
        id: ID!
        user: User!
        product: Product!
        quantity: Int!
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
        number: String!
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
        cart: [CartItem!]!
        orders: [Order!]!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type Query {
        products: [Product!]!
        product(id: ID!): Product!
        me: User!
    }
    type Mutation {
        createProduct(name: String!, description: String!, price: Float!, quantity: Int!): Product!
        updateProduct(id: ID!, name: String, description: String, price: Float, quantity: Int): Product!
        deleteProduct(id: ID!): Boolean!
        signup(email: String!, firstName: String!, lastName: String!, password: String!): String!
        signin(email: String!, password: String!): String!
        addToCart(productId: ID!): Boolean!
        removeFromCart(productId: ID!): Boolean!
    }
`;