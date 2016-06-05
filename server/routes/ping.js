module.exports = function () {
    return [{
        path:    '/ping',
        method:  'GET',
        handler: function (request, reply) {
            reply('pong');
        }
    }];
};