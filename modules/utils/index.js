const path = require('path'),
    USER_MODEl = require(path.join(process.cwd(), 'modules', 'user', 'server', 'model'));

function getSession(cookie) {
    let sessionKey = extractSessionId(cookie);
    if (typeof sessionKey !== 'undefined') {
        return USER_MODEl.getBySessionKey(sessionKey).then((userSession) => {
            return userSession;
        });
    }
}

function extractSessionId(cookie) {
    if (typeof cookie !== 'undefined') {
        let parts = cookie.split(';');
        for (let part of parts) {
            if (part.indexOf('sessionKey') !== -1) {
                return part.split('=')[1];
            }
        }
    }
}

module.exports = {
    getSession
}