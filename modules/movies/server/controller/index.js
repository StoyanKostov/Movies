const path = require('path'),
    fs = require('fs'),
    MOVIE_MODEl = require(path.join('..', 'model'));

module.exports = {
    add: MOVIE_MODEl.add,
    get: MOVIE_MODEl.get
};