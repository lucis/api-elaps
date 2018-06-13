const bodyParser = require('body-parser');
const ioMiddleware = {};
var cors = require('cors');


/**
 * Permite que requisições sejam feitas a partir de outros servidores
 * e também que seja recebido JSON como entrada da API REST
 */
ioMiddleware.set = (app)=>{
    app.use(cors())
    app.use(bodyParser.json());
};

module.exports = ioMiddleware;