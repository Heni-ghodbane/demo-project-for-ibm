"use strict";
module.exports = function (server, restify, restifyValidator, bodyParser) {
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    server.use(restifyValidator);
    //server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use(restify.authorizationParser());
  

    server.use(restify.throttle({
        rate: 1,
        burst: 2,
        xff: true
    }));
    
/*
    server.use(restify.authorizationParser());

    server.use(function (req, res, next) {
        var whitelistedIPs = ['111.222.333.444'];
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (whitelistedIPs.indexOf(ip) === -1) {
            var response = {
                'status': 'failure',
                'data': 'Invalid IP address'
            };
            res.setHeader('content-type', 'application/json');
            res.writeHead(403);
            res.end(JSON.stringify(response));
            return next();
        }
        return next();
    });

    server.use(function (req, res, next) {
        var apiKeys = {
            'user': 'kjhkjll23u38dxmn32bru8'
        };
        if (typeof(req.authorization.basic === 'undefined' || !apiKeys[req.authorization.basic.username] || req.authorization.basic.password !== apiKeys[req.authorization.basic.username])) {
            var response = {
                'status': 'failure',
                'data': 'You must specify a valid API key'
            };
            res.setHeader('content-type', 'application/json');
            res.writeHead(403);
            res.end(JSON.stringify(response));
            return next();
        }
        return next();
    }); 

    server.use(restify.throttle({
        rate: 1,
        burst: 2,
        xff: true
    }));
*/

};