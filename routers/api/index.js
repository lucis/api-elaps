const express = require('express');
const clientesRouter = require('./clientesRouter');
const apiRouter = express.Router();

apiRouter.use('/clientes', clientesRouter);

module.exports = apiRouter;