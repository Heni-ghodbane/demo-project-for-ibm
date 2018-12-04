"use strict";
var restify = require('restify');
var server = restify.createServer();
var setupController = require('./controllers/setupController.js');
var userController = require('./controllers/userController.js');
var authController = require('./controllers/authController.js');
var restifyValidator = require('restify-validator'); // or try this https://www.npmjs.com/package/node-restify-validation
var config = require('./config/dbConnection.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

mongoose.connect(config.getMongoConnection(), { useNewUrlParser: true });

setupController(server, restify, restifyValidator, bodyParser);
userController(server, config, jwt);
authController(server);


server.listen(8081, function () {
  console.log('%s listening at %s', server.name, server.url);
});