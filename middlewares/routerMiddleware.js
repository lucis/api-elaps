const authRouter = require('../routers/authRouter');
const cargaBaseRouter = require('../routers/cargaBaseRouter');
const routerMiddleware = {};

/**
 * 
 */
routerMiddleware.set = (app)=>{
    app.use('/auth', authRouter);
    app.use('/carga', cargaBaseRouter);
};

module.exports = routerMiddleware;