const { connect } = require("mongoose")
const { commander } = require("../utils/commander")
const { mode } = commander.opts()
require('dotenv').config({
    path: mode === 'development' ? './.env.development' : './.env.production'
})

let url = `mongodb+srv://sofisoler01:sofia123@proyectobackend.clbjxic.mongodb.net/ecommerce?retryWrites=true&w=majority`

module.exports = {
    port: process.env.PORT || 3030,
    mongoURL: process.env.MONGO_URL || url,
    adminName: process.env.ADMIN_NAME || '',
    adminPassword: process.env.ADMIN_PASSWORD || '',
    connectDB: () => {
        try {
            connect(url)
            console.log('Database connected')
        } catch (error) {
            console.log(error)
        } 
    },
    url: 'mongodb+srv://sofisoler01:sofia123@proyectobackend.clbjxic.mongodb.net/ecommerce?retryWrites=true&w=majority' 
}