module.exports = function (server) {
    return {
        method:  'GET',
        path:    '/routes',
        handler: function (reuest, reply) {

            var response = server.table()
                .map(function (table) {
                    return table.table.map(function (route) {
                        return route;
                    });
                }) // return an array of arrays of routes
                .reduce(function (a, b) {
                    return a.concat(b);
                })                 // flatten array of arrays
                .sort(function (a, b) {
                    return a.path.localeCompare(b.path);
                })  // sort routes by path (like Blipp)
                .reduce(function (acc, route) {
                    var methodClass = 'route-method badge ';
                    if (route.method.toUpperCase() == "GET") {
                        methodClass += 'list-group-item-info';
                    } else {
                        methodClass += 'list-group-item-warning';
                    }
                    acc += '<li class="list-group-item route" style="border:none; padding:25px 15px;"><span class="' + methodClass + '">' + route.method.toUpperCase() + ' </span> <span class="route-path"> ' + route.path + '</span></li>';
                    return acc;
                }, '');                                        // generate formatted output
            reply(
                '<html><head>' +
                '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">' +
                '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">' +
                '</head>' +
                '<body style="margin:20px">' +
                '<div class="panel panel-default">' +
                '<div class="panel-heading"><h3>Routes :</h3></div>' +
                '<h4><ul class="routes">' + response + '</ul></h4>' +
                '</div>' +
                '</body></html>');
        }
    };
};
