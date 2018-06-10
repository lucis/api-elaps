const Peca = require('../models/Peca');
const pecasService = {};

/**
 * Faz a busca de pecas na base de dados, 
 * com filtros, ordenamento, e paginação
 */
pecasService.buscarPecas = ({ query, orderBy, limit, page}) => {
    return Peca.lucisApiQuery({ query, orderBy, limit, page});
};

/**
 * Cria uma nova Peca no sistema
 */
pecasService.criarPeca = (novoPeca)=>{
    const peca = new Peca(novoPeca);

    const validacao = peca.validateSync();

    if (validacao){
        const erro = Object.values(validacao.errors)[0];
        return Promise.reject(erro.message);
    }

    return peca.save();
};

/**
 * Recupera os dados de uma Peca específica
 */
pecasService.recuperarPeca = (pecaId)=>{
    return Peca.findById(pecaId);
};

/**
 * Atualiza os dados de uma Peca na base de dados
 * 
 * @param {*String} pecaId 
 * @param {Peca} novoPeca 
 * @returns {Promise} contendo a peca atualizado
 */
pecasService.editarPeca = (pecaId, novoPeca)=>{
    return Peca.findByIdAndUpdate(pecaId, novoPeca).lean();
};

module.exports = pecasService;