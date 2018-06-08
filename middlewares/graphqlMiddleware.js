const { importSchema } = require('graphql-import');
const { ApolloServer, gql } = require('apollo-server');
const { registerServer } = require('apollo-server-express');

const typeDefs = gql(importSchema('./graphql/schema.graphql'));
const resolvers = require('./../resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers
});

/**
 * Configura o middleware para adicionar um servidor GraphQL
 */
module.exports = { set: (app) => registerServer({ server, app }) };