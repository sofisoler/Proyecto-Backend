const twilio = require('twilio');
const objConfig = require('../config/config');

const client = twilio(objConfig.twilio_account_sid, objConfig.twilio_auth_token)
exports.sendSms = async () => {
    await client.messages.create({
        body: 'Mensaje de prueba',
        from: objConfig.twilio_phone_number,
        to: objConfig.my_phone_number
    });
};