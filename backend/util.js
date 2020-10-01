const fs = require('fs');


module.exports = class Util {
    fixURLParameter(url) {
        var fixedURL = url.startsWith('/') ? url : '/' + url
        fixedURL = fixedURL.endsWith('/') ? fixedURL.slice(0, -1) : fixedURL;
        return fixedURL;
    }

    listDirectories(folder) {
        var walk = function (dir) {
            var results = [];
            var list = fs.readdirSync(dir);
            list.forEach(function (file) {
                file = dir + '/' + file;
                var stat = fs.statSync(file);
                if (stat && stat.isDirectory()) {
                    /* Recurse into a subdirectory */
                    results = results.concat(walk(file));
                } else {
                    /* Is a file */
                    results.push(file);
                }
            });
            return results;
        }
        return walk(folder)
    }
}