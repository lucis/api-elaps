const express = require('express');
const authService = require('../services/authService');
const errosUtil = require('../util/errosUtil');
const constantes = require('../util/constantes');

const authRouter = express.Router();

authRouter.post('/usuario', authService.middlewareValidaPermissao(authService.CRIAR_USUARIO), (req, res) => {
    return authService.criarUsuario(req.body, res);
});

authRouter.post('/login', (req, res)=>{
    return authService.login(req.body, res);
});



module.exports = authRouter;