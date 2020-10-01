const fs = require('fs');


module.exports = class Database {
    upsertMock(method, url, body) {
        var directories = url.split('/');
        var fileName = directories.pop();
        var path ='db/' + directories.join('/');
        var pathAndFileName = path + '/' + fileName + '.' + method + '.json'
        fs.mkdirSync(path, { recursive: true });
        fs.writeFileSync(pathAndFileName, JSON.stringify(body));
    };

    getMocks() {

    }

    removeMock(method, url) {
        var filePath = 'db' + url + '.' + method+ '.json'; 
        try {
            fs.unlinkSync(filePath);
        } catch(err) {
            console.log(err);
        }
    }
}

