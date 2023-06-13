const { Router } = require('express');
const { sendMailTransport } = require('../utils/nodemailer');

const mailRouter = Router();

mailRouter.get('/', async (req, res) => {
    try {
        sendMailTransport()
        res.send('Email enviado');
    } catch (error) {
        console.log(error);
    }
});

module.exports = mailRouter