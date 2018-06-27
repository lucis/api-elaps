const express = require('express');
const _ = require('lodash');
const moment = require('moment');
const authService = require('../services/authService');
const clientesService = require('../services/clientesService');
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

cargaBaseRouter.get('/mock-clientes', (req, res) => {
    const enderecos = [{
        rua: "Rua dos Prazeres",
        n: "1406 A",
        cep: "58405-602",
        cidade: "Parari",
        uf: "PB",
        bairro: "Único",
        complemento: "1º andar"
    },
    {
        rua: "Avenida Walkyria Santos",
        n: "100 A",
        cep: "58560-242",
        cidade: "Monteiro",
        uf: "PB",
        bairro: "Centro"
    },
    {
        rua: "Avenida Weskley dos Santos",
        n: "55",
        cep: "24232-411",
        cidade: "Fortaleza",
        uf: "PE",
        bairro: "Continental"
    }];
    
    const nomes = ['Lorem ipsum dolor sit', 'Luciano de Oliveira', 'Praesent eu enim', 'Sebastião Donato', 'Ricardo Vieira Coutinho', 'Vidal de Negreiros', 'Joaquim Maria dos Santos Filho de Nem da Feira', 'Ana Maria', 'Menino Neymar dos Santos Júnior'];
    const telefones = [{principal: '(83) 92101-2101', alternativo: '(81) 3324-2323'}, {principal: '(83) 3335-1678'}];

    const promises = [];

    for (let i = 0; i < 21; i++){
        const novoCliente = {};
        novoCliente.nome = nomes[_.random(nomes.length - 1)];
        novoCliente.endereco = enderecos[_.random(enderecos.length - 1)];
        novoCliente.dNasc = moment('20/05/1998', 'DD/MM/YYYY').unix();
        novoCliente.cpf = _.random(100, 999) + '.' + _.random(100, 999) + '.914-77';
        novoCliente.cnpj = '00.' + _.random(100, 999) + '.' + _.random(100, 999) + '/0001-77';
        novoCliente.pessoaFisica = _.random(1, 3) >= 2;
        novoCliente.rg = '3.442.659';
        novoCliente.email = 'teste@lucianoautopecas.com';
        novoCliente.telefones = telefones[_.random(enderecos.length - 1)]
        novoCliente.referencia = 'Facebook';
        promises.push(clientesService.criarCliente(novoCliente));
    }

    Promise.all(promises).then(()=>{
        res.send('ok');
    });
});

module.exports = cargaBaseRouter;