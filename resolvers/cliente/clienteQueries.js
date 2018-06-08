const clientesService = require('./../../services/clientesService');

module.exports = {
    cliente: (_, {id}, context) => {
        return clientesService.recuperarCliente(id);
    },
    clientes: (_, args, context) => {
        
    }
};