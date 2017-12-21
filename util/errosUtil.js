const errosUtil = {};

errosUtil.erroRest = function erroReST(codigo, erro, eobj,response){
    var prefixo;
    if (codigo >= 500) {
        prefixo = "Erro do sistema: ";
    }else if (codigo == 404){
        prefixo = "";
    }else if (codigo >= 400){
        prefixo = "Erro dos dados de entrada: ";
    }
    if (!response){
        response = eobj;
    }else{
        console.log(eobj);
        console.log(JSON.stringify(eobj || {}));
    }
    return response.status(codigo).json({erro: prefixo + erro});
};
    
module.exports = errosUtil;