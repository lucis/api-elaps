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
    items: []
});

module.exports = mongoose.model('Servico', servicoSchema);