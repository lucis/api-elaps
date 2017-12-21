const apiRouter = require('../routers/api');
const authRouter = require('../routers/authRouter');
const routerMiddleware = {};

/**
 * 
 */
routerMiddleware.set = (app)=>{
    app.use('/api', apiRouter);
    app.use('/auth', authRouter);
};

module.exports = routerMiddleware;