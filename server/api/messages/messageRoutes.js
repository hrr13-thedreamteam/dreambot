var express = require('express');

var app = express.Router();

var messageController = require('./messageController');

app.use('/', messageController.getMessages);

module.exports = app;
