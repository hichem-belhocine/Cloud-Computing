const express = require('express');
const watchController = require('./watch.controller');
const basicAuth = require('express-basic-auth');



const watchRouter = express.Router();
watchRouter.route('/').post(basicAuth({users: { 'cloud': 'computing' }}), watchController.create).get(basicAuth({users: { 'cloud': 'computing' }}),watchController.getAll);
watchRouter.route('/:sku').get(basicAuth({users: { 'cloud': 'computing' }}), watchController.getOne).put(basicAuth({users: { 'cloud': 'computing' }}), watchController.update).delete(basicAuth({users: { 'cloud': 'computing' }}),watchController.delete);
watchRouter.route('/find/:sku').get(basicAuth({users: { 'cloud': 'computing' }}),watchController.findPartial);
module.exports = watchRouter;