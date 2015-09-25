
module.exports = function (socket, server, config) {
    socket.on('ping', function (data) {
        socket.emit('pong', data);
    });
};