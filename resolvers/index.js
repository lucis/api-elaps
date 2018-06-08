const { rootResolvers: clienteRootResolvers, mutations: clienteMutations, queries: clienteQueries }  = require('./cliente');

module.exports = {
    ...clienteRootResolvers,
    Query: {
        ...clienteQueries
    },
    Mutation: {
        ...clienteMutations
    },
};