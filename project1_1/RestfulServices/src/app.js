const express =require('express');
const logger = require('morgan');
const connect = require('./config/db');
const restRouter = require('./api');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json'); 
const http = require('http');
const basicAuth = require('express-basic-auth');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use('/api', restRouter);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument,{
        explorer: true,
    }),
);
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.message = 'Invalid route';
    error.status = 404;
    res.setHeader("Expires", new Date(Date.now() + 3600000));
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message,
        },
    });
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});
