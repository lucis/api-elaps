const resolvers = require('./../resolvers');

const graphqlMiddleware = {};

const { ApolloServer, gql } = require('apollo-server');
const { registerServer } = require('apollo-server-express');

const typeDefs = gql`
  type Cliente {
      id: String
      nome: String
      dataDeNascimento: String
      endereco: Endereco
      cpf: String
      rg: String
      email: String
      telefones: Telefones
      referencia: String
      avatar: String
  }

  input ClienteInput {
    nome: String
    dataDeNascimento: String
    cpf: String
    rg: String
    email: String
    referencia: String
    avatar: String
    rua: String
    n: String
    cep: String
    cidade: String
    uf: String
    bairro: String
    complemento: String
    telefonePrincipal: String
    telefoneAlternativo: String
  }

  type Telefones {
      principal: String
      alternativo: String
  }

  type Endereco {
      rua: String
      n: String
      cep: String
      cidade: String
      uf: String
      bairro: String
      complemento: String
  }

  type Query {
    cliente(id: String!) : Cliente
    clientes : [Cliente]
  }

  type Mutation {
    addCliente(fields: ClienteInput): Cliente
  }
`;

console.log(resolvers);
// TODO: Conseguir ler os tipos dos arquivos
const server = new ApolloServer({
  typeDefs,
  resolvers
});

/**
 * Configura o middleware para adicionar um servidor GraphQL
 */
graphqlMiddleware.set = (app) => registerServer({ server, app });

module.exports = graphqlMiddleware;