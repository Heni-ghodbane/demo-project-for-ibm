"use strict";
var helpers = require('../config/helperFunctions.js');
var UserModel = require('../models/UserModel.js');

module.exports = function (server, config, jwt) {

    server.get("/api/users", function (req, res, next) {
        UserModel.find({}, function (err, users) {
            helpers.success(res, next, users);
            return next();
        });
        
/*      var token = req['authorization']['credentials'];
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                    var response = {
                        'status': 'failure',
                        'data': 'Failed to authenticate token!'
                    };

                    helpers.failure(res, next, response, 403);
                    return next();
                } else {
                    UserModel.find({}, function (err, users) {
                        helpers.success(res, next, users);
                        return next();
                    });
                }
        }); */

    });

    server.get("/api/user/:id", function (req, res, next) {
        req.assert('id', 'Id is required and must be numeric').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            helpers.failure(res, next, errors[0], 400);
            return next();
        }
        UserModel.findOne({
            _id: req.params.id
        }, function (err, user) {
            if (err) {
                helpers.failure(res, next, 'Something went wrong while fetching the user from the database', 500);
                return next();
            }
            if (user === null) {
                helpers.failure(res, next, 'The specified user could not be found', 404);
                return next();
            }
            helpers.success(res, next, user);
            return next();
        });
    });

    server.post("/api/user", function (req, res, next) {
        req.assert('first_name', 'First name is required').notEmpty();
        req.assert('last_name', 'Last name is required').notEmpty();
        req.assert('email_address', 'Email address is required and must be a valid email').notEmpty().isEmail();
        req.assert('career', 'Career must be either Recruiter Developer Consultant or Engineer').isIn(["Recruiter", "Developer", "Consultant", "Engineer"]);
        req.assert('status', 'Status must be either true or false').isIn(["true", "false"]);

        var errors = req.validationErrors();
        if (errors) {
            helpers.failure(res, next, errors, 400);
            return next();
        }
        var user = new UserModel();
        user.first_name = req.params.first_name;
        user.last_name = req.params.last_name;
        user.email_address = req.params.email_address;
        user.career = req.params.career;
        user.status = req.params.status;

        user.save(function (err) {
            if (err) {
                helpers.failure(res, next, errors, 500);
                return next();
            }
            helpers.success(res, next, user);
            return next();
        });
    });

    server.put("/api/user/:id", function (req, res, next) {
        req.assert('id', 'Id is required and must be numeric').notEmpty();
        req.assert('career', 'Career must be either Recruiter Developer Consultant or Engineer').isIn(["Recruiter", "Developer", "Consultant", "Engineer"]);

        var errors = req.validationErrors();
        if (errors) {
            helpers.failure(res, next, errors[0], 400);
            return next();
        }
        UserModel.findOne({
            _id: req.params.id
        }, function (err, user) {
            if (err) {
                helpers.failure(res, next, 'Something went wrong while fetching the user from the database', 500);
                return next();
            }
            if (user === null) {
                helpers.failure(res, next, 'The specified user could not be found', 404);
                return next();
            }
            var updates = req.params;
            delete updates.id;
            for (var field in updates) {
                user[field] = updates[field];
            }
            user.save(function (err) {
                if (err) {
                    helpers.failure(res, next, errors, 500);
                    return next();
                }
                helpers.success(res, next, user);
                return next();
            });
        });
    });

    server.del("/api/user/:id", function (req, res, next) {
        req.assert('id', 'Id is required and must be numeric').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            helpers.failure(res, next, errors[0], 400);
            return next();
        }
        UserModel.findOne({
            _id: req.params.id
        }, function (err, user) {
            if (err) {
                helpers.failure(res, next, 'Something went wrong while fetching the user from the database', 500);
                return next();
            }
            if (user === null) {
                helpers.failure(res, next, 'The specified user could not be found', 404);
                return next();
            }
            user.remove(function (err) {
                if (err) {
                    helpers.failure(res, next, errors, 500);
                    return next();
                }
                helpers.success(res, next, user);
                return next();
            });
        });
    });


}