const clientesService = require('./../../services/clientesService');

module.exports = {
    addCliente: async (_, { fields: novoCliente }) => {
        return await clientesService.criarCliente(novoCliente);
    },
    updateCliente: async (_, { fields: clienteAtualizado, id}) => {
        return await clientesService.editarCliente(id, novoCliente);
    }
};