require('dotenv').config();
const db = require('./db');
const express = require('express');
const {ApolloServer} = require('apollo-server-express');
// const {typeDefs, resolvers} = require('./schema');
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);


const products = [
    {
        id: 1,
        name: 'Product 1',
        description: 'Product 1 description',
        price: 9.99,
        quantity: 10,
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'Product 2 description',
        price: 19.99,
        quantity: 20,
    },
    {
        id: 3,
        name: 'Product 3',
        description: 'Product 3 description',
        price: 29.99,
        quantity: 30,
    },
];

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        products: () => products,
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
