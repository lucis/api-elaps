const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const constantes = require('./helpers/constantes');
const helper = require('./helpers/helper');

const clienteSchema = new Schema({
    nome: helper.criaStringReq('Você deve informar um nome'),
    dNasc: Date,
    endereco: constantes.criaEndereco(),
    imgUrl: String,
    cpf: {
        type: String,
        match: /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/
    },
    rg: String,
    email: String,
    telefone: {
        celular: String,
        fixo: String,
        comercial: String
    },
    referencia: String
});

// Aplicar API de paginação!

module.exports = mongoose.model('Cliente', clienteSchema);