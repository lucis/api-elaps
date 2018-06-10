const veiculosService = require('./../../services/veiculosService');

module.exports = {
    veiculo: (_, {id}, context) => {
        return veiculosService.recuperarVeiculo(id).catch((erro)=>{
            // TODO: Aqui deve acontecer o tratamento de erros (possivelmente com o apollo-errors),
            // já que é considerada uma falha passar o erro da camada do BD para o Cliente
            // revelando detalhes de implementação
            return erro;
        });
    },
    veiculos: (_, { data } , context) => {
        return veiculosService.buscarveiculos(data).then((veiculos) => {
            return { 
                entities: veiculos.docs,
                metadata: {
                    ...data,
                    ...veiculos,
                }
             };
        });
    }
};