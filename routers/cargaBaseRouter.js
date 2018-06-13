const express = require('express');
const authService = require('../services/authService');
const cargaBaseRouter = express.Router();

cargaBaseRouter.get('/primeiros-usuarios', (req, res) => {
    const luciano = {
        login: 'luciano', 
        senha: 'luciano', 
        perfil: {
            nome: 'Luciano Júnior', 
            role: 'admin'
        }
    };

    const silvania = {
        login: 'silvania', 
        senha: 'silvania', 
        perfil: {
            nome: 'Silvania Rosemere', 
            role: 'user'
        }
    };
    Promise.all([
        authService.criarUsuario(luciano),
        authService.criarUsuario(silvania)
    ]).then(()=>{
        res.send('ok');
    });
});

module.exports = cargaBaseRouter;