const express = require('express');
const watchRouter = require('./resources/watch');
const restRouter = express.Router();
restRouter.use('/watch', watchRouter);
module.exports = restRouter;
