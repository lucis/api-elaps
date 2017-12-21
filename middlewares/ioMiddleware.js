const bodyParser = require('body-parser');
const ioMiddleware = {};

/**
 * 
 */
ioMiddleware.set = (app)=>{
    app.use(bodyParser.json());
};

module.exports = ioMiddleware;