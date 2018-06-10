const pecasService = require('./../../services/pecasService');

module.exports = {
    addPeca: async (_, { fields: novaPeca }) => {
        return await pecasService.criarPeca(novaPeca);
    },
    updatePeca: async (_, { fields: pecaAtualizada, id}) => {
        return await pecasService.editarPeca(id, pecaAtualizada);
    }
};