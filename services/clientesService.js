const errosUtil = require('../util/errosUtil');
const constantes = require('../util/constantes');
const Cliente = require('../models/Cliente');
const clientesService = {};

/**
 * Cria uma nova Cliente no sistema
 */
clientesService.criarCliente = (novoCliente, response)=>{
    const cliente = new Cliente(novoCliente);
    
    const validacao = cliente.validateSync();

    if (validacao){
        const erro = Object.values(validacao.errors)[0];
        return errosUtil.erroRest(constantes.BAD_REQUEST, erro.message, erro, response);
    }

    cliente.save((err, saved)=>{
        if (err){
            return errosUtil.erroRest(constantes.INTERNAL_SERVER_ERROR, 'Houve um erro ao tentar criar o cliente', err, response);
        }
        return response.status(constantes.CREATED).json(saved);
    });
};

/**
 * Recupera os dados de uma Cliente específica
 */
clientesService.recuperarCliente = (clienteId, response)=>{
    Cliente.findById(clienteId, (erro, cliente)=>{
        if (err){
            return errosUtil.erroRest(constantes.INTERNAL_SERVER_ERROR, 'Houve um erro ao tentar criar o cliente', err, response);
        }
        return response.json(cliente);
    });
};

/**
 * @deprecated agora utilizamos direto no router o apiQuery
 * Recupera uma lista de Clientes
 */
clientesService.editarCliente = (clienteId, patches, response)=>{
    Cliente.findOneAndPatch(clienteId, patches, (err, patched)=>{
        if (err){
            return errosUtil.erroRest(constantes.INTERNAL_SERVER_ERROR, 'Houve um erro ao tentar alterar o cliente', err, response);
        }
        return response.json(cliente);
    });
};

module.exports = clientesService;