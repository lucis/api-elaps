const errosUtil = require('../util/errosUtil');
const constantes = require('../util/constantes');
const Cliente = require('../models/Cliente');
const clientesService = {};

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
clientesService.recuperarCliente = (clienteId, response)=>{
    return Cliente.findById(clienteId);
};

/**
 * Utiliza lucis-api-query 
 * 
 * @param {*String} clienteId 
 * @param {*} patches 
 * @param {*} response 
 */
clientesService.editarCliente = (clienteId, patches, response)=>{
    Cliente.findByIdAndPatch(clienteId, patches, (err, patched)=>{
        if (err){
            return errosUtil.erroRest(constantes.INTERNAL_SERVER_ERROR, err.message || 'Houve um erro ao tentar alterar o cliente', err, response);
        }
        return response.json(patched);
    });
};

module.exports = clientesService;