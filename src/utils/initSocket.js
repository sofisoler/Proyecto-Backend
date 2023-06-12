const messages = [];

const initSocket = (io) => {

    io.on('connection', (socket) => {
        console.log('New client connected')

        socket.on('message', objetoMensajeCliente => {
            messages.push(objetoMensajeCliente)
            io.emit('messageLogs', messages)
        })
        
        socket.on('authenticated', nombreUsuario => {
            socket.broadcast.emit('newUserConnected', nombreUsuario)
        })
    })
};

module.exports = {
    initSocket
};