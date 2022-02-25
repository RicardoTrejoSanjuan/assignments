const express = require('express');
const bodyParser = require('body-parser');
const serverRouter = require('./routers/serverRouter');
const LoggerRequest = require('./config/logger');

const app = express();

app.use(bodyParser.json());

app.use('/getServer', [
    LoggerRequest(),
    serverRouter
]);

module.exports = app;