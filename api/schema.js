const {gql} = require('apollo-server-express');

module.exports = {
    typeDefs: gql`
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
`,
    resolvers: {
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
    },
};