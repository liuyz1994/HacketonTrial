const fs = require('fs');


module.exports = class Database {
    upsertMock(method, url, body) {
        var directories = url.split('/');
        var fileName = directories.pop();
        var path = 'db/' + directories.join('/');
        var pathAndFileName = path + '/' + fileName + '.' + method + '.json'
        fs.mkdirSync(path, { recursive: true });
        fs.writeFileSync(pathAndFileName, JSON.stringify(body));
    };

    getMock(method, url) {
        var path = this.buildPathAndFileName(url, method)
        return fs.readFileSync(path, 'utf8')
    }

    removeMock() {

    }

    buildPathAndFileName(url, method) {
        var directories = url.split('/');
        var fileName = directories.pop();
        var path = 'db/' + directories.join('/');
        return path + '/' + fileName + '.' + method + '.json'
    }

}

