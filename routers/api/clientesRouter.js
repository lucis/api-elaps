const express = require('express');
const clientesService = require('../../services/clientesService');
const authService = require('../../services/authService');
const Cliente = require('../../models/Cliente');

const clientesRouter = express.Router({mergeParams: true});

// TODO; middlewareValidaPermissao
clientesRouter.get('/', Cliente.lucisApiQuery());

// TODO; middlewareValidaPermissao
clientesRouter.get('/:clienteId', (req, res)=>{
    return clientesService.recuperarCliente(req.params, res);
});

// TODO; middlewareValidaPermissao
clientesRouter.post('/', (req, res)=>{
    return clientesService.criarCliente(req.body, res);
});

// TODO; middlewareValidaPermissao
clientesRouter.patch('/:clienteId', (req, res)=>{
    return clientesService.editarCliente(req.params.clienteId, req.body, res);
});

module.exports = clientesRouter;