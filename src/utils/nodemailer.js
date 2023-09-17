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

sendMailResetPassword = async (toEmail) => {
    await transport.sendMail ({
        from: `Ecommerce <${process.env.GMAIL_MAIL_USER}>`,
        to: toEmail,
        subject: 'Restablecer contraseña',
        html: `
            <div>
                <h1>Restablecer contraseña</h1>
                <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
                <div>
                    <a href="https://proyecto-backend-68h5-dev.fl0.io/reset-password">Restablecer contraseña en línea</a>
                </div>
                <div>
                    <a href="http://localhost:8080/reset-password">Restablecer contraseña en local</a>
                </div>
                <p>Si no has solicitado restablecer tu contraseña, ignora este mensaje.</p>
            </div>
        `,
        attachments: []
    });
};

module.exports = {
    sendMailResetPassword
};