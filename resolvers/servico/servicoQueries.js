const servicosService = require('./../../services/servicosService');

module.exports = {
    servico: (_, {id}, context) => {
        return servicosService.recuperarServico(id).catch((erro)=>{
            // TODO: Aqui deve acontecer o tratamento de erros (possivelmente com o apollo-errors),
            // já que é considerada uma falha passar o erro da camada do BD para o Cliente
            // revelando detalhes de implementação
            return erro;
        });
    },
    servicos: (_, { data } , context) => {
        return servicosService.buscarServicos(data).then((servicos) => {
            return { 
                entities: servicos.docs,
                metadata: {
                    ...data,
                    ...servicos,
                }
             };
        });
    }
};