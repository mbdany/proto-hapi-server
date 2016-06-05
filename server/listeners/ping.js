module.exports = function (io, server, config) {
    io.of('/ping')
      .on('connection', function (socket) {
            socket.on('ping', function (data) {
                socket.emit('pong', data);
            });
      });

};