const veiculosService = require('./../../services/veiculosService');

module.exports = {
    Cliente: {
        id: (root) => root._id,
        veiculos: (root) => {
            // TODO: Criar um método de Veiculos que recupere todos de um Cliente
            return null;
        }
    }
};