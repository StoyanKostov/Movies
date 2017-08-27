const fs = require('fs'),
    path = require('path');

function insert(table, data, cb) {
    let content,
        id,
        DB = getTable(table);
    fetch(table, null, (err, result) => {
        content = result;
    });
    if(typeof data.id !== 'undefined'){
        id = data.id;
    } else {
        id = getId(content);
    }
    content[id] = data;
    fs.writeFileSync(DB, JSON.stringify(content));
    if (typeof cb === 'function') {
        cb(null, id);
    }
}

function update(table, data, cb) {
    let content,
        DB = getTable(table);
    fetch(table, null, (err, result) => {
        content = result;
    });

    let currUser = content[data.id];
    for (let prop in data.user) {
        currUser[prop] = data.user[prop];
    }

    fs.writeFileSync(DB, JSON.stringify(content));
    if (typeof cb === 'function') {
        cb(null, data.id);
    }
}

function remove(table, data, cb) {
    let content,
        DB = getTable(table);

    fetch(table, null, (err, result) => {
        content = result;
    });
    if (content.hasOwnProperty(data.id)) {
        delete content[data.id];
    } else {
        throw new Error('User does not exist');
    }

    fs.writeFileSync(DB, JSON.stringify(content));
    if (typeof cb === 'function') {
        cb(null, data.id);
    }
}

function fetch(table, id, cb) {
    let result,
        DB =  getTable(table),
        content = fs.readFileSync(DB, 'utf8');
    if (content === "") {
        result = {};
    } else {
        result = JSON.parse(content);
    }

    if (typeof id !== 'undefined' && id !== null && id !== "") {
        if (result.hasOwnProperty(id)) {
            result = result[id];
        } else {
            cb(new Error('User does not exists'), null);
        }
    }
    cb(null, result);
}

function getByUsername(table, username, cb) {
    let currUser,
        users,
        DB =  getTable(table),
        content = fs.readFileSync(DB, 'utf8');
    if (content === "") {
        users = {};
    } else {
        users = JSON.parse(content);
    }

    if (typeof username !== 'undefined' && username !== null && username !== "") {
        let userIds = Object.keys(users);
        for(let id of userIds){
            if(users[id].username === username){
                currUser = users[id];
                currUser.id = id;
                break;
            };
        }
    }

    if( typeof currUser === 'undefined' ){
        cb(new Error('User does not exists'), null);
    }  else {
        cb(null, currUser);
    }
}

function getId(entries) {
    let biggestId = 0;
    let ids = Object.keys(entries);
    for (let idx = ids.length; idx >= 0; idx--) {
        let id = parseInt(ids[idx], 10);
        biggestId = id > biggestId ? id : biggestId;
    }

    return biggestId += 1;
}

function getTable(table) {
    return path.join(process.cwd(), 'data', `${table}.json`);
}

module.exports = {
    insert,
    update,
    fetch,
    remove,    
    getByUsername
}