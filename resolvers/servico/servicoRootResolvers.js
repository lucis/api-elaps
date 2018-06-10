const clientesService = require('./../../services/clientesService');
const veiculosService = require('./../../services/veiculosService');

module.exports = {
    Servico: {
        id: (root) => root._id,
        cliente: (root) => {
            return clientesService.recuperarCliente(root.clienteId);
        },
        veiculo: (root) => {
            return veiculosService.recuperarVeiculo(root.veiculoId);
        }
    }
};