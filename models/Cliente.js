const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const constantes = require('./helpers/constantes');
const helper = require('./helpers/helper');

const { pluginMongoose } = require('lucis-api-query');

const clienteSchema = new Schema({
    nome: helper.criaStringReq('Você deve informar um nome'),
    email: String,
    dNasc: Date,
    endereco: constantes.criaEndereco(),
    imgUrl: String,
    pessoaFisica: {
        type: Boolean,
        default: true
    },
    cpf: {
        type: String,
        match: /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/,
        unique: true
    },
    cnpj: {
        type: String,
        match: /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/,
        unique: true
    },
    rg: String,
    telefones: {
        principal: String,
        alternativo: String
    },
    referencia: String
});

clienteSchema.plugin(pluginMongoose);

module.exports = mongoose.model('Cliente', clienteSchema);