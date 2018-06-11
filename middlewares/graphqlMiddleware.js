const { importSchema } = require("graphql-import");
const { ApolloServer, gql } = require("apollo-server");
const { registerServer } = require("apollo-server-express");

const typeDefs = importSchema("./graphql/schema.graphql");
const resolvers = require("./../resolvers");

const authService = require('./../services/authService');

const server = new ApolloServer({
  typeDefs,
  resolvers
});

/**
 * Configura o middleware para adicionar um servidor GraphQL
 */
module.exports = {
  set: app => {
    app.use("/graphql", authService.middlewareAutenticacao);
    return registerServer({ server, app });
  }
};
