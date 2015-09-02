//--------------------------------------
// Add the js client applications routes
// Static files route
//--------------------------------------
module.exports = function (server, config) {
    return config.assign({
        method:    "GET",
        "path":    "/{param*}",
        "handler": {
            "directory": {
                "path":    "../dist",
                "listing": false
            }
        }
    }, config["static-route"]);
};