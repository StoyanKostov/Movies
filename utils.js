let path = require('path'),
    crypto = require('crypto'),
    fs = require('fs');

function initApp(modules) {
    let app = {};

    modules.forEach(function (module) {
        let modulePath = path.join(process.cwd(), 'modules', module.name, 'server');

        // Routes
        let routesPath = path.join(modulePath, 'routes');
        getModules(routesPath, function (err, router) {
            if (err !== null) {
                throw err;
            }
            let prefixedRoutes = {};
            let routes = require(path.join(routesPath, router));
            for (let route in routes) {
                prefixedRoutes[`${module.urlPrefix ? '/' + module.urlPrefix : ''}${route}`] = routes[route];
            }

            app.routes = Object.assign({}, app.routes, prefixedRoutes);
        });
    });

    return app;
}

function getModules(dirname, callback) {
    if (fs.existsSync(dirname)) {
        var filenames = fs.readdirSync(dirname);
        filenames.forEach(function (filename) {
            callback(null, filename);
        });
    } else {
        console.log('Module path "%s" does not exists', dirname);
    }
}

function genSessionKey() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(8, (err, buf) => {
            if (err) {
                return reject(err);
            }
            return resolve(buf.toString('hex'));
        });
    })
}

function genSalt() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(8, (err, buf) => {
            if (err) {
                return reject(err);
            }
            return resolve(buf.toString('hex'));
        });
    })
}

function genPassword(password) {
    return genSalt().then((salt) => {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, salt, 100000, 10, 'sha512', (err, derivedKey) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ 'passwordHash': derivedKey.toString('hex'), 'salt': salt });
            })
        });
    });
}

function isPasswordValid(password, salt, passwordHash) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 100000, 10, 'sha512', (err, derivedKey) => {
            if (err) {
                return reject(err);
            }
            return resolve(derivedKey.toString('hex') === passwordHash);
        })
    });
}

module.exports = {
    genSessionKey,
    initApp,
    genPassword,
    isPasswordValid
}