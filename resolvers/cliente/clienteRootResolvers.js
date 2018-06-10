const veiculosService = require('./../../services/veiculosService');

module.exports = {
    Cliente: {
        id: (root) => root._id,
        veiculos: (root) => {
            return veiculosService.recuperarVeiculosPorDono(root._id);
        }
    }
};