const { logger } = require("../utils/logger");

class ResetPasswordController {

    renderResetPassword = (req, res) => {
        try {
            res.render('reset-password');
        } catch (error) {
            logger.error(error);
        }
    };

    emailResetPassword = async (req, res) => {
        try {
            sendMailResetPassword()
            res.send('Se ha enviado un correo de restablecimiento de contraseña. Por favor, revisa tu bandeja de entrada y sigue las instrucciones proporcionadas.');
        } catch (error) {
            logger.error(error);
        }
    };
};

module.exports = ResetPasswordController