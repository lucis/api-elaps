const veiculosService = require('./../../services/veiculosService');

module.exports = {
    addVeiculo: async (_, { fields: novoVeiculo }) => {
        return await veiculosService.criarVeiculo(novoVeiculo);
    },
    updateVeiculo: async (_, { fields: VeiculoAtualizado, id}) => {
        return await veiculosService.editarVeiculo(id, novoVeiculo);
    }
};