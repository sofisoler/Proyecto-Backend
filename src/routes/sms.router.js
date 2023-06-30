const { Router } = require('express');
const { sendSms } = require('../utils/sendSmsTwilio');
const { logger } = require('../utils/logger');

const smsRouter = Router();

smsRouter.get('/', async (req, res) => {
    try {
        await sendSms('Mensaje de prueba')
        res.send('SMS enviado');
    } catch (error) {
        logger.error(error);
    }
});

module.exports = smsRouter