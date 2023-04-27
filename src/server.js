const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const routerApp = require('./routes')
const { Server } = require('socket.io')
const { ProductManager } = require('./Daos/ProductDaos/ProductDaos')
const { objConfig } = require('./config/config')

objConfig.connectDB()

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

app.use(cookieParser('secret-Project'))
app.use(session({
    secret: 'secretProject',
    resave: true,
    saveUninitialized: true
}))

app.use('/static',express.static(__dirname + '/public'))
app.use(cookieParser())

app.use(routerApp)

app.get('/home', async (req, res) => {
    let allProducts = await readProducts
    res.render('home', {
        title: 'Backend | Home',
        products: allProducts
    })
})

app.get('/realTimeProducts', async (req, res) => {
    let allProducts = await readProducts
    res.render('realTimeProducts', {
        title: 'Backend | Real Time Products',
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

io.on('connection', (socket) => {
    const emitProducts = async () => {
        const products = await readProducts
        io.emit('loadProducts', products)
    }
    emitProducts();

    socket.on ('newproduct', async (data) => {
        const newProduct = products.addProduct(data);
        console.log(newProduct)
    })
})