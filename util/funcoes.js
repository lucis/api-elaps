(function(){
    'use strict';

    var moment = require('moment');
    var _ = require('lodash');
    moment.locale('pt-br');

    var funcoes = {};

    funcoes.geraNomeRandomico = function geraNomeRandomico(tamanho){
        var tamanho = tamanho || 10;
        var saida = "";
        var conjunto = "ABCDEFGHIJKLMNOPQRSTUVWXYZepolabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < tamanho; i++ ){
            saida += conjunto.charAt(Math.floor(Math.random() * conjunto.length));
        }

        return saida;
    };

    funcoes.numeroParaExtenso = function numeroParaExtenso(c){
        var saida = funcoes.realParaExtenso(c);
        var fatiado = saida.split(' ');
        var indiceReal = fatiado.indexOf('Reais');
        if (indiceReal == -1) return fatiado.join(' ');
        return fatiado.slice(0, indiceReal).join(' ');
    };

    funcoes.dataParaExtenso = function dataParaExtenso(data){
        if (!_.isDate(data)) return '';
        return moment(data).format('LL');
    };

    funcoes.handlerWaterfall = function handlerWaterfall(erro, resultado, response, msgPadrao){
        if (erro){
            console.log(JSON.stringify(erro.err || ''));
            return response.status(erro.status).json({erro: erro.msg});
        }
        return response.json(resultado);
    };
    
    module.exports = funcoes;
})();