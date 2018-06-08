const { importSchema } = require('graphql-import');
const resolvers = require('./../resolvers');

const graphqlMiddleware = {};

const { ApolloServer, gql } = require('apollo-server');
const { registerServer } = require('apollo-server-express');

const typeDefs = gql(importSchema('./graphql/schema.graphql'));

const server = new ApolloServer({
  typeDefs,
  resolvers
});

/**
 * Configura o middleware para adicionar um servidor GraphQL
 */
graphqlMiddleware.set = (app) => registerServer({ server, app });

module.exports = graphqlMiddleware;