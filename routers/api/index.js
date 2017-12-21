const express = require('express');
const eventosRouter = require('./eventosRouter');
const filiacoesRouter = require('./filiacoesRouter');
const apiRouter = express.Router();

apiRouter.use('/eventos', eventosRouter);
apiRouter.use('/filiacoes', filiacoesRouter);

module.exports = apiRouter;