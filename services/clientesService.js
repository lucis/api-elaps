const Cliente = require('../models/Cliente');
const clientesService = {};

/**
 * Faz a busca de clientes na base de dados, 
 * com filtros, ordenamento, e paginação
 */
clientesService.buscarClientes = ({ query, orderBy, limit, page}) => {
    return Cliente.lucisApiQuery({ query, orderBy, limit, page});
};

/**
 * Cria uma nova Cliente no sistema
 */
clientesService.criarCliente = (novoCliente)=>{
    const cliente = new Cliente(novoCliente);

    const validacao = cliente.validateSync();

    if (validacao){
        const erro = Object.values(validacao.errors)[0];
        return Promise.reject(erro.message);
    }

    return cliente.save();
};

/**
 * Recupera os dados de uma Cliente específica
 */
clientesService.recuperarCliente = (clienteId)=>{
    return Cliente.findById(clienteId);
};

/**
 * Atualiza os dados de um Cliente na base de dados
 * 
 * @param {*String} clienteId 
 * @param {Cliente} novoCliente 
 * @returns {Promise} contendo o cliente atualizado
 */
clientesService.editarCliente = (clienteId, novoCliente)=>{
    return Cliente.findByIdAndUpdate(clienteId, novoCliente);
};

module.exports = clientesService;