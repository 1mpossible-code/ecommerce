const {gql} = require('apollo-server-express');

module.exports = gql`
    scalar DateTime
    scalar Status
    scalar Role
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
        items: [CartItem!]!
        user: User!
        shippingDetails: ShippingDetails!
        status: Status!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type ShippingDetails {
        id: ID!
        user: User!
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
        role: Role!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type Query {
        products: [Product!]!
        product(id: ID!): Product!
        
        me: User!
        
        users: [User!]!
        user(id: ID!): User!
        
        orders(userID: ID): [Order!]!
        order(id: ID!): Order!
    }
    type Mutation {
        createProduct(name: String!, description: String!, price: Float!, quantity: Int!): Product!
        updateProduct(id: ID!, name: String, description: String, price: Float, quantity: Int): Product!
        deleteProduct(id: ID!): Boolean!
        
        signup(email: String!, firstName: String!, lastName: String!, password: String!): String!
        signin(email: String!, password: String!): String!
        
        setToCart(productId: ID!, quantity: Int!): Boolean!
        
        setShippingDetails(firstName: String!, lastName: String!, number: String!, address: String!, city: String!, state: String!, zip: String!): Boolean!
        
        createOrder: Order!
        updateOrderStatus(userId: ID!, status: Status!): Boolean!
    }
`;