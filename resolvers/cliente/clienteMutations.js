const clientesService = require('./../../services/clientesService');

module.exports = {
    addCliente: async (_, { fields: novoCliente }) => {
        return await clientesService.criarCliente(novoCliente);
    }
};