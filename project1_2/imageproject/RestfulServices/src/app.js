const express =require('express');
const restRouter = require('./api');
const swaggerUi = require('swagger-ui-express');
const openApiUi = require('express-openapi');
const swaggerDocument = require('./config/openapi.json'); 
const http = require('http');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/image/v1/api', restRouter);

app.use(
    '/image/v1/api-docs',
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
