const authRouter = require('../routers/authRouter');
const routerMiddleware = {};

/**
 * 
 */
routerMiddleware.set = (app)=>{
    app.use('/auth', authRouter);
};

module.exports = routerMiddleware;