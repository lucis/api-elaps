const pecasService = require('./../../services/pecasService');

module.exports = {
    peca: (_, {id}, context) => {
        return pecasService.recuperarPeca(id).catch((erro)=>{
            // TODO: Aqui deve acontecer o tratamento de erros (possivelmente com o apollo-errors),
            // já que é considerada uma falha passar o erro da camada do BD para o Cliente
            // revelando detalhes de implementação
            return erro;
        });
    },
    pecas: (_, { data } , context) => {
        return pecasService.buscarPecas(data).then((pecas) => {
            return { 
                entities: pecas.docs,
                metadata: {
                    ...data,
                    ...pecas,
                }
             };
        });
    }
};