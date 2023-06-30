const {connect} = require('mongoose');
const { logger } = require('./logger');

class MongoSingleton {

    static #instance

    constructor() {
        connect('mongodb+srv://sofisoler01:sofia123@proyectobackend.clbjxic.mongodb.net/ecommerce?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    };

    static getInstance() {
        if (this.#instance){
            logger.info('Database already connected')
            return this.#instance
        }
        this.#instance = new MongoSingleton()
        logger.info('Database connected')
        return this.#instance
    };
};

module.exports = MongoSingleton