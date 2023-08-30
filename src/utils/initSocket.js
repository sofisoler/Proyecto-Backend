const { logger } = require("./logger");

const messages = [];

const initSocket = (io) => {

    io.on('connection', (socket) => {
        logger.info('New client connected');

        socket.on('message', objetoMensajeCliente => {
            messages.push(objetoMensajeCliente);
            io.emit('messageLogs', messages);
        });
        
        socket.on('authenticated', nombreUsuario => {
            socket.username = nombreUsuario;
            socket.broadcast.emit('newUserConnected', nombreUsuario);
        });

        socket.on('disconnect', () => {
            if (socket.username) {
                socket.broadcast.emit('userDisconnected', socket.username);
            }
        });

        socket.on('updateProductList', () => {
        });

        socket.on('newProductCreated', () => {
            io.emit('updateProductList');
        });
    });
};

module.exports = {
    initSocket
};