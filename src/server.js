const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Server } = require('socket.io');
const objConfig = require('./config/config');
const { create } = require('connect-mongo');
const handlebars = require('express-handlebars');
const passport = require('passport');
const { initializePassport } = require('./passport/strategyPassport');
const { initSocket } = require('./utils/initSocket');
const { addLogger, logger } = require('./utils/logger');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');
const routerApp = require('./routes');

objConfig.dbConnection();

const app = express();
const PORT = objConfig.port;

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    helpers: {
        multiply: function (price, quantity) {
            return price * quantity;
        }
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    }
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        req.method = req.body._method.toUpperCase();
        delete req.body._method;
    }
    next();
});

app.use(cookieParser('secret-Project'));
app.use(
    session({
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
    })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/static', express.static(__dirname + '/public'));
app.use(cookieParser());

app.use(routerApp);

app.use(addLogger);

const server = app.listen(PORT, () => {
    logger.info(`Express server listening on ${server.address().port}`);
});

server.on('error', error => logger.error(`Express server error: ${error}`));

const io = new Server(server);
initSocket(io);

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de Proyecto Backend',
            description: 'API pensada para desafio Swagger'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
};

const specs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));