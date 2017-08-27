const HTTP = require('http'),
    URL = require('url'),
    fs = require('fs'),
    path = require('path'),
    CONFIG = require('./config')[process.env.NODE_ENV],
    { initApp } = require('./utils'),
    APP_MODULES = [{ 'name': 'index' }, { 'name': 'movies', 'urlPrefix': 'movies' }, { 'name': 'user', 'urlPrefix': 'user' }],
    // Init application
    APP = initApp(APP_MODULES);

// Start apllication server
const server = HTTP.createServer(function (req, res) {
    let urlParsed = URL.parse(req.url),
        pathname = urlParsed.pathname,
        body = "",
        contentType,
        extname = path.extname(pathname);

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        default:
            contentType = 'application/json';
    }

    if ((req.method === 'GET' || req.method === 'DELETE') && urlParsed.query !== null) {
        let getParams = urlParsed.query.split('&');
        body = getParams.reduce((obj, param) => {
            let decomposedParam = param.split('=');
            obj[decomposedParam[0]] = decomposedParam[1];
            return obj;
        }, {});
    }

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {
        res.setHeader('Content-Type', contentType);
        try {
            // Handles static files requests
            if (req.method === 'GET' && pathname.indexOf('/static/') !== -1) {
                fs.readFile(require.resolve(path.join(process.cwd(), 'ui', 'build', pathname)), (err, content) => {
                    res.statusCode = 200;
                    res.end(content, 'utf-8');
                });
                return;
            }

            // Handles End-points
            let route = APP.routes[urlParsed.pathname];
            if (route.method === req.method) {
                req.body = typeof body === 'string' && body != '' ? JSON.parse(body) : body;
                route.handler(req, res);
                return;
            }

            // 
            res.statusCode = 404;
            res.end(JSON.stringify({
                code: 1,
                message: 'End point not found'
            }));
        }
        catch (err) {
            res.statusCode = 404;
            res.end(JSON.stringify({
                code: 1,
                message: 'End point not found'
            }));
        }
    });
}).listen(CONFIG.WEB_SERVER.PORT, CONFIG.WEB_SERVER.HOST, function () {
    let address = server.address();
    console.log(`Server running at http://${address.address}:${address.port}`);
});