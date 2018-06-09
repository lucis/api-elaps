const mongoose = require('mongoose');
const { pluginMongoose } = require('lucis-api-query');
const Schema = mongoose.Schema;

const helper = require('./helpers/helper');

const veiculoSchema = new Schema({
    placa: helper.criaStringReq("Você deve informar a placa"),
    uf: String,
    modelo: String,
    ano: String,
    cidade: String,
    motor: String,
    cor: String,
    montadora: String,
    dono: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: [true, 'Você deve informar o dono do carro']
    },
    historicoDonos: [{
            type: Schema.Types.ObjectId,
            ref: 'Cliente',
            required: [true, 'Você deve informar o dono do carro']
    }],
    dataDeCadastro: {
        type: Date,
        default: Date.now
    }
});

veiculoSchema.plugin(pluginMongoose);

module.exports = mongoose.model('Veiculo', veiculoSchema);