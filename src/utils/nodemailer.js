const { createTransport } = require('nodemailer');
require('dotenv').config();

const transport = createTransport({
    service: 'gmail',
    port: '587',
    auth: {
        user: process.env.GMAIL_MAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

exports.sendMailTransport = async () => {
    await transport.sendMail ({
        from: `Ecommerce <${process.env.GMAIL_MAIL_USER}>`,
        to: 'sofisoler01@gmail.com',
        subject: 'Correo de prueba',
        html: `
            <div>
                <h1>Correo de prueba</h1>
            </div>
        `,
        attachments: []
    });
};