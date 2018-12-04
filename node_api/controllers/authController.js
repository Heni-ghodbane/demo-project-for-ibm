"use strict";
var helpers = require('../config/helperFunctions.js');
var AdminModel = require('../models/adminModel.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/loginConfig.js');

module.exports = function (server) {

    server.post("/api/register", function (req, res, next) {
        req.assert('username', 'First name is required').notEmpty();
        req.assert('password', 'Last name is required').notEmpty();
        req.assert('email', 'Email address is required and must be a valid email').notEmpty().isEmail();
 
        var errors = req.validationErrors();
        if (errors) {
            helpers.failure(res, next, errors, 400);
            return next();
        }

        var hashedPassword = bcrypt.hashSync(req.params.password, 8);

        var admin = new AdminModel();
        admin.username = req.params.username;
        admin.password = hashedPassword;
        admin.email = req.params.email;
 
        admin.save(function (err) {
            if (err) {
                helpers.failure(res, next, errors, 500);
                return next();
            }
            // create a token
            var token = jwt.sign({ id: admin._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            helpers.success(res, next, admin, token);
            return next();
        });
    });


    server.get("/api/login", function (req, res, next) {
        req.assert('username', 'First name is required').notEmpty();
        req.assert('password', 'Last name is required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            helpers.failure(res, next, errors, 400);
            return next();
        }

        var errors = req.validationErrors();
        if (errors) {
            helpers.failure(res, next, errors[0], 400);
            return next();
        }
        AdminModel.findOne({
           username: req.params.username
        }, function (err, admin) {
            if (err) {
                helpers.failure(res, next, 'Something went wrong while fetching the admin from the database', 500);
                return next();
            }
            if (admin === null) {
                helpers.failure(res, next, 'The specified user Admin could not be found!', 404);
                return next();
            }

            var passwordIsValid = bcrypt.compareSync(req.params.password, admin.password);

            if (!passwordIsValid) {
                helpers.failure(res, next, 'The username or password are wrong!', 401);
                return next();
            }

            var token = jwt.sign({ id: admin._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            helpers.success(res, next, admin, token);
            return next();
        });
    });

    server.get("/api/logout", function (req, res, next) {
        helpers.success(res, next, null, null);
    });
}