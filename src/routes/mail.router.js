const { Router } = require('express');
const { sendMailTransport } = require('../utils/nodemailer');
const { logger } = require('../utils/logger');

const mailRouter = Router();

mailRouter.get('/', async (req, res) => {
    try {
        sendMailTransport()
        res.send('Email enviado');
    } catch (error) {
        logger.error(error);
    }
});

module.exports = mailRouter