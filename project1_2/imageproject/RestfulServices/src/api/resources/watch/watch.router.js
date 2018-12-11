const express = require('express');
const watchController = require('./watch.controller');



const watchRouter = express.Router();
watchRouter.route('/:sku').get(watchController.getOne);
module.exports = watchRouter;