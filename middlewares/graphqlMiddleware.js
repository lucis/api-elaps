const graphqlMiddleware = {};

const { ApolloServer } = require('apollo-server');
const { registerServer } = require('apollo-server-express');
const { typeDefs } = require('./../schema');

// TODO: Conseguir ler os tipos dos arquivos
// TODO: Ler os resolvers de algum canto
const server = new ApolloServer({
  typeDefs
});

/**
 * Configura o middleware para adicionar um servidor GraphQL
 */
graphqlMiddleware.set = (app)=>registerServer({ server, app });

module.exports = graphqlMiddleware;