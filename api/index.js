const express = require('express');
const helmet = require('helmet');
const {ApolloServer} = require('apollo-server-express');
const depthLimit = require('graphql-depth-limit');
const {createComplexityLimitRule} = require('graphql-validation-complexity');
require('dotenv').config();

const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const jwt = require('jsonwebtoken');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);

const app = express();
app.use(helmet());

const getUser = token => {
    if (token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            throw new Error('Session invalid.');
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: ({req}) => {
        const token = req.headers.authorization;
        const user = getUser(token);
        return {models, user};
    },
});

server.start().then(() => {
    server.applyMiddleware({app, path: '/graphql'});
    app.listen({port}, () =>
        console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`),
    );
});
