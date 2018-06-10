const { rootResolvers: clienteRootResolvers, mutations: clienteMutations, queries: clienteQueries }  = require('./cliente');
const { rootResolvers: veiculoRootResolvers, mutations: veiculoMutations, queries: veiculoQueries }  = require('./veiculo');

module.exports = {
    ...clienteRootResolvers,
    ...veiculoRootResolvers,
    Query: {
        ...clienteQueries,
        ...veiculoQueries
    },
    Mutation: {
        ...clienteMutations,
        ...veiculoMutations
    },
};