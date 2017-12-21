const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = {
    criaStringReq: (msg, unique)=>({
        type: String,
        required: [true, msg],
        unique
    }),
    criaEnumReq: (msg, values) =>({
        type: String,
        required: [true, msg],
        enum: values
    }),
    criaDateReq: (msg) => ({
        type: Date,
        required: [true, msg]
    }),
    criaBooleanReq: (msg) => ({
        type: Boolean,
        required: [true, msg]
    }),
    criaRef: (model) => ({
        type: Schema.Types.ObjectId,
        ref: model
    }),
    criaRefString: (model) => ({
        type: String,
        ref: model
    })
};