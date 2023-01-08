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
        createProduct(name: String!, description: String!, price: Float!, quantity: Int!): Product!
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        products: async () => {
            return await models.Product.find();
        },
        product: async (_, {id}) => {
            return await models.Product.findById(id);
        },
    },
    Mutation: {
        createProduct: async (_, {name, description, price, quantity}) => {
            return await models.Product.create({name, description, price, quantity});
        }
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
