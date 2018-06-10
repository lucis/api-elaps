const Usuario = require('../models/Usuario');
const errosUtil = require('../util/errosUtil');
const constantes = require('../util/constantes');
const jwt = require('jsonwebtoken');
const SECRET = global.SECRET;

const authService = {};

/**
 * Método que realiza login na aplicação, utilizando padrão JWT
 * 
 * @param {Object} loginData - objeto com login e senha do usuário
 * @param {Object} res - encapsula response
 */
authService.login = function login(loginData, res){
    const { login, senha } = loginData;
    const query = Usuario.findById(login).lean();
    query.exec((err, usuarioBD) => {
        if (err){
            return errosUtil.erroRest(constantes.INTERNAL_SERVER_ERROR, 'Houve um erro ao tentar logar', err, res);
        }
        if (!usuarioBD){
            return errosUtil.erroRest(constantes.BAD_REQUEST, 'Usuário ou senha incorretos', res);
        }
        Usuario.checkPassword(senha, usuarioBD.senha, (err, isMatch) => {
            if (err){
                return errosUtil.erroRest(constantes.INTERNAL_SERVER_ERROR, 'Houve um erro ao tentar logar', err, res);
            }
            if (!isMatch){
                return errosUtil.erroRest(constantes.BAD_REQUEST, 'Usuário ou senha incorretos', res);
            }
            const { _id, perfil } = usuarioBD;
            jwt.sign({ login: _id, perfil}, SECRET, {algorithm: constantes.HS256}, (err, token) => {
                if (err){
                    return errosUtil.erroRest(constantes.INTERNAL_SERVER_ERROR, 'Houve um erro ao tentar logar', err, res);
                }
                return res.status(constantes.OK).json({token}).end();
            });
        });
    });
};

/**
 * Método que cria um usuário na base do sistema, após uma cliente ter sido criada para ser asssociada
 * 
 * modelo de usuarioData: {
 *  login: '25168', 
 *  senha: 'magnificos',
 *  cliente: Ref ObjectId
 * }
 * 
 */
authService.criarUsuario = function criarUsuario(usuarioData, res){
    const usuario = new Usuario(usuarioData);
    
    const validacao = usuario.validateSync();

    if (validacao){
        const erro = Object.values(validacao.errors)[0];
        return errosUtil.erroRest(constantes.BAD_REQUEST, erro.message, erro, res);
    }

    // TODO: Verificar se a cliente associada existe e se não há outro usuário associado a ela
    Usuario.hashifyAndSave(usuario, (err, ok)=>{
        if (err){
            return errosUtil.erroRest(constantes.INTERNAL_SERVER_ERROR, 'Houve um erro ao tentar logar', err, res);
        }
        return res.status(constantes.CREATED).end();
    });
};

/**
 * Cria middleware que verifica permissão de tal ação. 
 * 
 */
authService.middlewareValidaPermissao = function middlewareValidaPermissao (tipo, payload){
    return (req, res, next) => {
        // Por enquando, todo mundo pode tudo
        next();
    };
};

module.exports = authService;