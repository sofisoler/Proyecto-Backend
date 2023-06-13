const { commander } = require("../utils/commander")
const MongoSingleton = require("../utils/MongoSingleton")
const { mode } = commander.opts()
require('dotenv').config({
    path: mode === 'development' ? './.env.development' : './.env.production'
})

let url = `mongodb+srv://sofisoler01:sofia123@proyectobackend.clbjxic.mongodb.net/ecommerce?retryWrites=true&w=majority`

module.exports = {
    persistence: process.env.PERSISTENCE,
    gmail_pass: process.env.GMAIL_PASS,
    gmail_mail_user: process.env.GMAIL_MAIL_USER,
    twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
    twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
    twilio_phone_number: process.env.TWILIO_PHONE_NUMBER,
    my_phone_number: process.env.MY_PHONE_NUMBER,
    dbConection: async () => MongoSingleton.getInstance(),
    port: process.env.PORT || 3030,
    mongoURL: process.env.MONGO_URL || url,
    adminName: process.env.ADMIN_NAME || '',
    adminPassword: process.env.ADMIN_PASSWORD || '',
    url: 'mongodb+srv://sofisoler01:sofia123@proyectobackend.clbjxic.mongodb.net/ecommerce?retryWrites=true&w=majority' 
}