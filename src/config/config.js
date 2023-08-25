const { commander } = require("../utils/commander");
const MongoSingleton = require("../utils/MongoSingleton");
const { mode } = commander.opts();
require('dotenv').config({
    path: mode === 'development' ? './.env.development' : './.env.production'
});

const url = 'mongodb+srv://sofisoler01:sofia123@proyectobackend.clbjxic.mongodb.net/ecommerce?retryWrites=true&w=majority';

module.exports = {
    persistence: process.env.PERSISTENCE,
    gmail_pass: process.env.GMAIL_PASS,
    gmail_mail_user: process.env.GMAIL_MAIL_USER,
    dbConnection: async () => MongoSingleton.getInstance(),
    port: process.env.PORT || 3030,
    mongoURL: process.env.MONGO_URL || url,
    adminName: process.env.ADMIN_NAME || '',
    adminPassword: process.env.ADMIN_PASSWORD || '',
    url: url
};