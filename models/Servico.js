const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const helper = require('./helpers/helper');

const servicoSchema = new Schema({
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    dataFinalizacao: Date,
    clienteId: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: [true, 'Você deve informar o Cliente']
    },
    veiculoId: {
        type: Schema.Types.ObjectId,
        ref: 'Veiculo',
        required: [true, 'Você deve informar o Veículo']
    },
    kilometragem: Number,
    items: [{
        pecaId: { type: Schema.Types.ObjectId, ref: 'Peca'},
        descricao: helper.criaStringReq('Você deve informar a descrição do Item'),
        unidade: String,
        qtd: Number,
        pUnitario: Number,
        total: {type: Number, required: [true, 'Você deve informar o Preço']}
    }],
    obs: String
});

module.exports = mongoose.model('Servico', servicoSchema);