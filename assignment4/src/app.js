const express = require('express');
const bodyParser = require('body-parser');
const LoggerRequest = require('./config/logger');
const JSONSchema = require('./config/JSONSchema')

const { postUserSchema, putUserSchema } = require('./config/schemas');

const {
    addController,
    getController,
    putController
} = require('./controller')

const app = express();

app.use(bodyParser.json());

app.post('/add', [
    LoggerRequest(),
    JSONSchema(postUserSchema), 
    addController
]);

app.get('/view', [
    LoggerRequest(),
    getController
]);

app.put('/edit/:id', [
    LoggerRequest(),
    JSONSchema(putUserSchema),
    putController
]);

module.exports = app;