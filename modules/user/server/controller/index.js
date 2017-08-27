const path = require('path'),
    fs = require('fs'),
    USER_MODEl = require(path.join('..', 'model'));

module.exports = {
    create: USER_MODEl.register,
    login: USER_MODEl.login
};