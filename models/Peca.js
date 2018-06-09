const mongoose = require('mongoose');
const { pluginMongoose } = require('lucis-api-query');
const Schema = mongoose.Schema;

const helper = require('./helpers/helper');

const pecaSchema = new Schema({
    referencia: helper.criaStringReq('Você deve informar a referência da Peça'),
    descricao: helper.criaStringReq('Você deve informar a descrição da Peça'),
    preco: {
        type: Number,
        required: [true, 'Você deve informar o preço da Peça']
    },
    unidade: {
        type: String,
        enum: ['LT', 'UN'],
        default: 'UN'
    },
    ultimaMudancaPreco: {
        type: Date,
        default: Date.now
    }
});

pecaSchema.plugin(pluginMongoose);

module.exports = mongoose.model('Peca', pecaSchema);