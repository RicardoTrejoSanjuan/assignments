const express = require('express');
const bodyParser = require('body-parser');
const weatherRouter = require('./routers/weatherRouter');
const LoggerRequest = require('./config/logger');

const app = express();

app.use(bodyParser.json());

app.use('/weather', [
    LoggerRequest(),
    weatherRouter
]);

module.exports = app;