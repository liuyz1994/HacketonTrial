const fs = require('fs');


class Database {
    upsertMock(method, url, body) {
        var fileName = 'req.' + url + '.' + method + '.json';
        fs.writeFile('.db/' + fileName ,JSON.stringify(body),function(err) {
            if(err) throw err;
        })
    };

    getMocks() {

    }

    removeMock() {
        
    }

}

