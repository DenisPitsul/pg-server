const express = require('express');
const router = require('./routes');
const { errorHandlers } = require('./middleware');

const app = express();

app.use(express.json());

app.use('/api', router);

app.use(errorHandlers.validationErrorHandler, errorHandlers.errorHandler);

module.exports = app;
