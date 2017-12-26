const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const constantes = require('./helpers/constantes');
const helper = require('./helpers/helper');

const { pluginMongoose } = require('lucis-api-query');

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
        principal: String,
        alternativo: String
    },
    referencia: String,
    avatar: String
});

// Aplicar API de paginação!
clienteSchema.plugin(pluginMongoose);

module.exports = mongoose.model('Cliente', clienteSchema);