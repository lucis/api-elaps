const Usuario = require('../models/Usuario');
const errosUtil = require('../util/errosUtil');
const constantes = require('../util/constantes');
const jwt = require('jsonwebtoken');
const async = require('async');
const SECRET = global.SECRET;

const authService = {};

/**
 * Método que realiza login na aplicação, utilizando padrão JWT
 * 
 * @param {Object} loginData - objeto com idDemolay e senha do usuário
 * @param {Object} res - encapsula response
 */
authService.login = function login(loginData, res){
    const {idDemolay, senha} = loginData;
    const query = Usuario.findOne({idDemolay}).lean();
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
            const { cliente } = usuarioBD;
            // TODO => Mexer aqui quando o usuário poder acessar outra filiação (ex: priorado)
            // const queryFiliacao = FiliacaoDeMolay.findOne({cliente}).select('_id').lean();
            // queryFiliacao.exec((err, filiacao)=>{
            //     if (err){
            //         return errosUtil.erroRest(constantes.INTERNAL_SERVER_ERROR, 'Houve um erro ao tentar logar', err, res);
            //     }
            //     const jwtPayload = {filiacaoId: filiacao._id, idDemolay};
                
            //     jwt.sign(jwtPayload, SECRET, {algorithm: constantes.HS256}, function(err, token){
            //         if (err){
            //             return errosUtil.erroRest(constantes.INTERNAL_SERVER_ERROR, 'Houve um erro ao tentar logar', err, res);
            //         }
            //         return res.status(constantes.OK).json({token}).end();
            //     });
            // });
        });
    });
};

/**
 * Método que cria um usuário na base do sistema, após uma cliente ter sido criada para ser asssociada
 * 
 * modelo de usuarioData: {
 *  idDemolay: '25168', 
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
authService.middlewareValidaPermissao = function middlewareValidaPermissao(tipo, payload){
    return (req, res, next) => {
        const {filiacaoId} = req.usuario;
        const query = FiliacaoDeMolay.findById(filiacaoId).lean();
        query.exec((err, filiacao)=>{
            if (err){
                return errosUtil.erroRest(constantes.INTERNAL_SERVER_ERROR, 'Houve um erro ao recuperar os dados', err, res);
            }
            if (!filiacao){
                return errosUtil.erroRest(constantes.UNAUTHORIZED, 'A filiação não existe.', res);
            }

            let acessoNegado;
            // Supoe se que os campos ref não vem populados, mas sim com ID
            switch (tipo) {
                case CRIAR_USUARIO:
                    acessoNegado = ['mc'].includes(filiacao.cargo)
                    break;
                case CRIAR_EVENTO:
                    acessoNegado = ['mc'].includes(filiacao.cargo) && req.body.unidade == filiacao.unidade;
                    break;
                default:
                    break;
            }

            if (acessoNegado){
                return errosUtil.erroRest(constantes.FORBIDDEN, 'Você não tem permissão para esta ação', res);
            }else{
                return next();
            }

        });
    };
};

authService.CRIAR_USUARIO = 'CRIAR_USUARIO';
authService.CRIAR_EVENTO = 'CRIAR_EVENTO';

module.exports = authService;