var express = require('express');

var messageRoutes = require('./messages/messageRoutes');

var app = express.Router();

app.use('/messages', messageRoutes);

module.exports = app;
