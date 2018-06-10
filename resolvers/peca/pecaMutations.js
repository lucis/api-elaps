const pecasService = require('./../../services/pecasService');

module.exports = {
    addPeca: async (_, { fields: novaPeca }) => {
        return await pecasService.criarPeca(novaPeca);
    },
    updatePeca: async (_, { fields: PecaAtualizado, id}) => {
        return await pecasService.editarPeca(id, novaPeca);
    }
};