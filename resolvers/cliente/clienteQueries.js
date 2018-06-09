const clientesService = require('./../../services/clientesService');

module.exports = {
    cliente: (_, {id}, context) => {
        return clientesService.recuperarCliente(id);
    },
    clientes: (_, { data } , context) => {
        return clientesService.buscarClientes(data).then((clientes) => {
            return { 
                entities: clientes.docs,
                metadata: {
                    ...data,
                    ...clientes,
                }
             };
        });
    }
};