require('dotenv').config();

const db = require('./db');
const models = require('./models');

const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
// const {typeDefs, resolvers} = require('./schema');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);


const typeDefs = gql`
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
        createProduct(name: String!, price: Float!): Product!
    }
`;

// const products = [
//     {
//         id: 1,
//         name: 'Product 1',
//         description: 'Product 1 description',
//         price: 9.99,
//         quantity: 10,
//     },
//     {
//         id: 2,
//         name: 'Product 2',
//         description: 'Product 2 description',
//         price: 19.99,
//         quantity: 20,
//     },
//     {
//         id: 3,
//         name: 'Product 3',
//         description: 'Product 3 description',
//         price: 29.99,
//         quantity: 30,
//     },
// ];
//
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        products: async () => {
            return await models.Product.find();
        },
        product: (_, {id}) => {
            return products.find(product => product.id === id);
        },
    },
    Mutation: {
        createProduct: (_, {name, price}) => {
            const product = {id: String(products.length + 1), name, price};
            products.push(product);
            return product;
        },
    },
};

const app = express();

const server = new ApolloServer({typeDefs, resolvers});

server.start().then(() => {
    server.applyMiddleware({app, path: '/graphql'});
    app.listen({port}, () =>
        console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`),
    );
});
