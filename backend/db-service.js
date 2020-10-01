const fs = require('fs');
const utilModule = require('./util.js');

const basePath = 'db'

const util = new utilModule;


module.exports = class Database {
    upsertMock(method, url, body) {
        var directories = url.split('/');
        var fileName = directories.pop();
        var path = basePath + "/" + directories.join('/');
        var pathAndFileName = path + '/' + fileName + '.' + method + '.json'
        fs.mkdirSync(path, { recursive: true });
        console.log('body',body)
        fs.writeFileSync(pathAndFileName, JSON.stringify(JSON.parse(body)));
    };

    getMocks() {
        var filenames = util.listDirectories(basePath)
        var results = [];
        filenames.forEach(function (file) {
            var directories = file.split('/');
            var fileName = directories.pop()
            var urlEntity = fileName.split('.')[0]

            var mockEndpoint = {
                'method': fileName.split('.')[1],
                'url': directories.slice(1).join('/') + '/' + urlEntity,
                'value': JSON.parse(fs.readFileSync(file, 'utf-8'))
            }

            results.push(mockEndpoint)
        })
        return results
    }

    removeMock(method, url) {
        var filePath = basePath + "/" + url + '.' + method + '.json';
        try {
            fs.unlinkSync(filePath);
        } catch (err) {
            console.log(err);
        }
    }

    getMockByMethodAndURL(url, method) {
        var filePath = 'db' + url + '.' + method+ '.json'; 
        return fs.readFileSync(filePath);
    }
}

