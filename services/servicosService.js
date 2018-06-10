const Servico = require('../models/Servico');
const servicosService = {};

/**
 * Faz a busca de servicos na base de dados, 
 * com filtros, ordenamento, e paginação
 */
servicosService.buscarServicos = ({ query, orderBy, limit, page}) => {
    return Servico.lucisApiQuery({ query, orderBy, limit, page});
};

/**
 * Cria uma nova Servico no sistema
 */
servicosService.criarServico = (novoServico)=>{
    const servico = new Servico(novoServico);

    const validacao = servico.validateSync();

    if (validacao){
        const erro = Object.values(validacao.errors)[0];
        return Promise.reject(erro.message);
    }

    return servico.save();
};

/**
 * Recupera os dados de uma Servico específica
 */
servicosService.recuperarServico = (servicoId)=>{
    return Servico.findById(servicoId);
};

/**
 * Atualiza os dados de uma Servico na base de dados
 * 
 * @param {*String} servicoId 
 * @param {Servico} novoServico 
 * @returns {Promise} contendo a servico atualizado
 */
servicosService.editarServico = (servicoId, novoServico)=>{
    return Servico.findByIdAndUpdate(servicoId, novoServico).lean();
};

module.exports = servicosService;