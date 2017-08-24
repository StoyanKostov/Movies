const path = require('path'),
    fs = require('fs'),
    USER_MODEl = require(path.join('..', 'model'));

module.exports = {
    home: function () {
        return new Promise((resolve, reject) => {
            // fs.readFile(require.resolve(path.join(process.cwd(), 'ui', 'build', 'index.html')), (err, content) => {
            fs.readFile(require.resolve(path.join(process.cwd(), 'ui', 'public', 'index.html')), (err, content) => {
                if (err) {
                    reject(err);
                };
                resolve(content);
            });
        });
    }
};