const { Router } = require('express');
const { sendSms } = require('../utils/sendSmsTwilio');

const smsRouter = Router();

smsRouter.get('/', async (req, res) => {
    try {
        await sendSms('Mensaje de prueba')
        res.send('SMS enviado');
    } catch (error) {
        console.log(error);
    }
});

module.exports = smsRouter