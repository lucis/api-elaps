const Usuario = require('../models/Usuario');
const Unidade = require('../models/Unidade');
const Cliente = require('../models/Cliente');
const FiliacaoDeMolay = require('../models/FiliacaoDeMolay');
const moment = require('moment');
const async = require('async');
const mongoose = require('mongoose');
const constantes = require('../util/constantes');

function criaUsuarios() {

    async.waterfall([
    // 1. Remover tudo do sistema
    (done)=>{
        mongoose.connection.dropDatabase(done);
    },
    // 2. Criar a Unidade
    (done) => {
        const novaUnidade = {
            nome: "Deus, Pátria e Família",
            n: "008",
            tipo: "cap",
            fundacao: moment('10/08/1982', constantes.DATA_BRASIL).toDate(),
            instalacao: moment('26/02/1983', constantes.DATA_BRASIL).toDate()
        };
        const unidade = new Unidade(novaUnidade);
        unidade.save((err, unidade)=>{
            if (err){
                return done(err);
            }
            return done(null, unidade);
        });
    },
    // 3. Criar a Cliente
    (unidade, done) => {
        const novaCliente = {
            idDemolay: '25168',
            nome: 'Luciano de Oliveira Júnior',
            dNasc: moment('20/05/1998', constantes.DATA_BRASIL).toDate()
        };
        const cliente = new Cliente(novaCliente);
        cliente.save((err, cliente)=>{
            if (err){
                return done(err);
            }
            return done(null, cliente, unidade)
        });
    },
    // 2. Criar a Filiação
     (cliente, unidade, done)=>{
        const filiacao = new FiliacaoDeMolay({
            isPrincipal: true,
            cliente: cliente._id,
            unidade: unidade._id,
            tipo: 'dm-ativo',
            situacao: 'reg',
            cargo: '1c',
            isAdmin: true,
            regularidade: {
                ultimoAno: 2017
            },
        });

        filiacao.save((err, ok)=>{
            if (err){
                return done(err);
            }
            return done(null, cliente);
        });
    },
    // 3. Criar Usuario
    (cliente, done)=>{
        const usuario = new Usuario({
            idDemolay: '25168',
            senha: 'magnificos',
            cliente: cliente._id
        });

        Usuario.hashifyAndSave(usuario, (err, ok)=>{
            if (err){
                return done(err);
            }
            return done();
        });
    }], (err, ok)=>{
        if (err){
            console.log(err);
        }else{
            console.log('DEU CERTO');
        }
    });
};

mongoose.connect('mongodb://localhost/vilar-demolay').then(() => {
    criaUsuarios();
}, (err) => {
    console.log('Ocorreu um erro');
    console.log(err);
});