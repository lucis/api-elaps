const servicosService = require('./../../services/servicosService');

module.exports = {
    addServico: async (_, { fields: novoServico }) => {
        return await servicosService.criarServico(novoServico);
    },
    updateServico: async (_, { fields: servicoAtualizado, id}) => {
        return await servicosService.editarServico(id, servicoAtualizado);
    }
};