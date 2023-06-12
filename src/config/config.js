const { commander } = require("../utils/commander")
const MongoSingleton = require("../utils/MongoSingleton")
const { mode } = commander.opts()
require('dotenv').config({
    path: mode === 'development' ? './.env.development' : './.env.production'
})

let url = `mongodb+srv://sofisoler01:sofia123@proyectobackend.clbjxic.mongodb.net/ecommerce?retryWrites=true&w=majority`

module.exports = {
    persistence: process.env.PERSISTENCE,
    dbConection: async () => MongoSingleton.getInstance(),
    port: process.env.PORT || 3030,
    mongoURL: process.env.MONGO_URL || url,
    adminName: process.env.ADMIN_NAME || '',
    adminPassword: process.env.ADMIN_PASSWORD || '',
    url: 'mongodb+srv://sofisoler01:sofia123@proyectobackend.clbjxic.mongodb.net/ecommerce?retryWrites=true&w=majority' 
}