const clientesService = require('./../../services/clientesService');

module.exports = {
    addCliente: (a, b, c) => {
        console.log(a,b,c);
        return {nome: "Luciano Júnior"};
    }
};