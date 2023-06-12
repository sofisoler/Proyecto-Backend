const {connect} = require('mongoose');

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
            console.log('Database already connected')
            return this.#instance
        }
        this.#instance = new MongoSingleton()
        console.log('Database connected')
        return this.#instance
    };
};

module.exports = MongoSingleton