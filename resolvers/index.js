const { rootResolvers: clienteRootResolvers, mutations: clienteMutations, queries: clienteQueries }  = require('./cliente');
const { rootResolvers: veiculoRootResolvers, mutations: veiculoMutations, queries: veiculoQueries }  = require('./veiculo');
const { rootResolvers: pecaRootResolvers, mutations: pecaMutations, queries: pecaQueries }  = require('./peca');

module.exports = {
    ...clienteRootResolvers,
    ...veiculoRootResolvers,
    ...pecaRootResolvers,
    Query: {
        ...clienteQueries,
        ...veiculoQueries,
        ...pecaQueries
    },
    Mutation: {
        ...clienteMutations,
        ...veiculoMutations,
        ...pecaMutations
    },
};