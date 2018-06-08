const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const constantes = require('./helpers/constantes');
const helper = require('./helpers/helper');

const usuarioSchema = new Schema({
    _id: String,
    senha: helper.criaStringReq('Você deve informar uma senha'),
    perfil: {
        nome: helper.criaStringReq('Você deve informar o nome'),
        imgUrl: String,
        tipo: String
    },
    criadoEm: {
        type: Date,
        default: Date.now
    },
    ultimoLogin: {
        type: Date,
        default: Date.now
    }
});

const Usuario = module.exports = mongoose.model('Usuario', usuarioSchema);

/**
 * Método utilizado no cadastro de um usuário, onde sua senha está bruta no objeto usuário.
 * 
 * 1. Um sal (string randomica) é gerada pelo bcrypt
 * 2. É feito um hash na senha com esse sal. O sal é salvo prefixando o hash da senha (senha: SAL + HASH_SAL_E_SENHA)
 * 3. O usuário, então, é salvo no banco de dados.
 */
module.exports.hashifyAndSave = function(usuario, cb){
    bcrypt.hash(usuario.senha, 12, function(err, hash){
        if (err) {
            console.log(err);
            console.log('===== ERRO NA GERAÇÃO DO HASH ====');
            return cb(err, null);
        }
        usuario.senha = hash;
        usuario.save(cb);
    });
};

/**
 * Método utilizando para comparar uma senha digitada pelo usuário com a senha real cadastrada.
 * O sistema não tem acesso as senhas dos usuários, apenas podendo modificá-las, isso pois a senha foi salva
 * hasheada com sal do bcrypt
 * 
 * 1. Como o sal também é salvo na string so hash (método acima), o mesmo algoritmo é realizado com a senha digitada pelo user
 * 2. Então, o hash da senha (+sal) salvo no BD é comparado com o resultado do algortimo feito com a senha digitava
 * 3. Caso dê positivo, o usuário procede na sua autenticação
 */
module.exports.checkPassword = function(candidate, hash, cb){
    bcrypt.compare(candidate, hash, function(err, isMatch){
        if (err) return cb(err, null);
        cb(null, isMatch);
    });
};