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

sendMailTransport = async () => {
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

sendMailResetPassword = async () => {
    await transport.sendMail ({
        from: `Ecommerce <${process.env.GMAIL_MAIL_USER}>`,
        to: 'sofisoler01@gmail.com',
        subject: 'Restablecer contraseña',
        html: `
            <div>
                <h1>Restablecer contraseña</h1>
                <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
                <a href="http://localhost:8080/reset-password">Restablecer contraseña</a>
                <p>Si no has solicitado restablecer tu contraseña, ignora este mensaje.</p>
            </div>
        `,
        attachments: []
    });
};

module.exports = {
    sendMailTransport,
    sendMailResetPassword
};