const mongoose = require('mongoose');
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


module.exports = mongoose.model('Peca', pecaSchema);