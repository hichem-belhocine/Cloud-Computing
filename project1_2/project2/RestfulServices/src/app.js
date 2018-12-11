const express =require('express');
const logger = require('morgan');
const connect = require('./config/db');
const restRouter = require('./api');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json'); 
const http = require('http');
const basicAuth = require('express-basic-auth');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use('/watch/v2/api', restRouter);

app.use(
    '/watch/v2/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument,{
        explorer: true,
    }),
);
app.get('/api', function (req, res) {
    res.writeHeader(200);
    res.end('Health checker Ingress');
});

app.get('/', function (req, res) {
    res.writeHeader(200);
    res.end('Health checker Ingress');
});
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
