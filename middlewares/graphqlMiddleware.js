const graphqlMiddleware = {};

const { ApolloServer, gql } = require('apollo-server');
const { registerServer } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'world'
  }
};

// TODO: Conseguir ler os tipos dos arquivos
// TODO: Ler os resolvers de algum canto
const server = new ApolloServer({
  typeDefs,
  resolvers
});

/**
 * Configura o middleware para adicionar um servidor GraphQL
 */
graphqlMiddleware.set = (app)=>registerServer({ server, app });

module.exports = graphqlMiddleware;