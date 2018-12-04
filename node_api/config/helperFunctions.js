"use strict";
function _respond(res, next, status, data, http_code, token) {
    var response = {
        'status': status,
        'data': data,
        'token': token 
    };

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
 
    res.setHeader('content-type', 'application/json');
    res.writeHead(http_code);
    res.end(JSON.stringify(response));
    //return next();
}

module.exports.success = function success(res, next, data, token) {
    _respond(res, next, 'success', data, 200, token);
};

module.exports.failure = function failure(res, next, data, http_code) {
    _respond(res, next, 'failure', data, http_code);
};