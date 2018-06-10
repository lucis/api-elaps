const clientesService = require('./../../services/clientesService');
const veiculosService = require('./../../services/veiculosService');

module.exports = {
    Veiculo: {
        id: (root) => root._id,
        dono: (root) => {
            return clientesService.recuperarCliente(root.donoId);
        },
        historicoDonos: (root) => {
            return veiculosService.recuperarHistoricoDonos(root._id);
        }
    }
};