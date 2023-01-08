const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
// const {typeDefs, resolvers} = require('./schema');
const port = process.env.PORT || 4000;

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
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
