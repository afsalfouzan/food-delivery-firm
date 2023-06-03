const createError = require('http-errors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/index');

var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customLevelTitle: "API Overview | swagger API Documentation"
};
app.use('/docs/web/api', swaggerUi.serveFiles(swaggerDocument,options), swaggerUi.setup(swaggerDocument,options));

app.listen(5000);

module.exports = app;

