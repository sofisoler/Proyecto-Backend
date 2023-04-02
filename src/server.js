const express = require('express')
const cookieParser = require('cookie-parser')
const productRouter = require('./routes/product.router')
const cartRouter = require('./routes/cart.router')
const viewsRouter = require('./routes/views.router')
const { Server } = require('socket.io')
const { ProductManager } = require('./Daos/ProductDaos/ProductDaos')

const app = express();
const PORT = 8080;

const handlebars = require('express-handlebars')

const products = new ProductManager();
const readProducts = products.readProducts();

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

app.get('/home', async (req, res) => {
    let allProducts = await readProducts
    res.render('home', {
        title: 'Backend | Home',
        products: allProducts
    })
})

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