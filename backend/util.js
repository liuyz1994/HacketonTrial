module.exports = class Util {
    fixURLParameter(url) { 
        var fixedURL = url.startsWith('/') ? url : '/' + url
        fixedURL = fixedURL.endsWith('/') ? fixedURL.slice(0, -1) : fixedURL;
        return fixedURL;
    }  
}