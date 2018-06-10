const clientesService = require('./../../services/clientesService');

// TODO: Recuperar Dono e Histórico Donos
module.exports = {
    Veiculo: {
        id: (root) => root._id,
        dono: (root) => {
            return clientesService.recuperarCliente(root.donoId);
        },
        historicoDonos: (root) => {
            // TODO: Verificar como seria feria a população, ou fazer uma busca do BD para cada um.
            // Promise.all, creio eu!
            return null;
        }
    }
};