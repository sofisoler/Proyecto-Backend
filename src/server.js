const express = require('express')
const cookieParser = require('cookie-parser')
const productRouter = require('./routes/product.router')
const cartRouter = require('./routes/cart.router')
const viewsRouter = require('./routes/views.router')
const { Server } = require('socket.io')

const app = express();
const PORT = 8080;

const handlebars = require('express-handlebars')

app.engine('handlebars', handlebars.engine())
app.set('view engine','handlebars' )
app.set('views', __dirname+'/views')

app.use(express.json())
app.use(express.urlencoded({extended : true}));

app.use(express.static(__dirname + '/public'))
app.use(cookieParser())

app.use('/views', viewsRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)

const server = app.listen(PORT, () => {
    console.log(`Express server listening on ${server.address().port}`)
});

server.on("error", (error) => console.log(`Express server error: ${error}`))

const io = new Server(server)

const messages = [];
io.on('connection', socket => {
    console.log('New client connected')
    socket.on('message', objetoMensajeCliente => {
        messages.push(objetoMensajeCliente)
        io.emit('messageLogs', messages)
    })
    socket.on('authenticated', nombreUsuario => {
        socket.broadcast.emit('newUserConnected', nombreUsuario)
    })
})