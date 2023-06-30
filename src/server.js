const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const routerApp = require('./routes')
const { Server } = require('socket.io')
const { ProductManager } = require('./Daos/memoryDAO/product.memory')
const objConfig = require('./config/config')
const { create } = require('connect-mongo')
const handlebars = require('express-handlebars')
const passport = require('passport')
const { initializePassport } = require('./passport/strategyPassport')
const { initSocket } = require('./utils/initSocket')
const { addLogger, logger } = require('./utils/logger')

objConfig.dbConection();

const app = express();
const PORT = objConfig.port

const products = new ProductManager();
const readProducts = products.readProducts();

app.engine('handlebars', handlebars.engine())
app.set('view engine','handlebars' )
app.set('views', __dirname+'/views')

app.use(express.json())
app.use(express.urlencoded({extended : true}));

app.use((req, res, next) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      req.method = req.body._method.toUpperCase();
      delete req.body._method;
    }
    next();
});

app.use(cookieParser('secret-Project'))
app.use(session({
    store: create({
        mongoUrl: objConfig.url,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 3600000
    }),
    secret: 'secretProject',
    resave: true,
    saveUninitialized: true
}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/static',express.static(__dirname + '/public'))
app.use(cookieParser())

app.use(routerApp)

app.use(addLogger)

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
    logger.info(`Express server listening on ${server.address().port}`)
});

server.on("error", (error) => logger.error(`Express server error: ${error}`))

const io = new Server(server)
initSocket(io);