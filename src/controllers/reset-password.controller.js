const { userModel } = require("../Daos/mongo/models/users.model");
const { logger } = require("../utils/logger");
const bcrypt = require("bcrypt");
const { sendMailResetPassword } = require("../utils/nodemailer");

class ResetPasswordController {

    renderResetPassword = (req, res) => {
        try {
            res.render('reset-password', { title: 'Restablecer contraseña' });
        } catch (error) {
            logger.error(error);
        }
    };

    enterEmail = (req, res) => {
        try {
            res.render('reset-password-email', { title: 'Restablecer contraseña' });
        } catch (error) {
            logger.error(error);
        }
    };

    emailResetPassword = async (req, res) => {
        try {
            const { toEmail } = req.body;
            sendMailResetPassword(toEmail);
            res.send('Se ha enviado un correo de restablecimiento de contraseña. Por favor, revisa tu bandeja de entrada y sigue las instrucciones proporcionadas.');
        } catch (error) {
            logger.error(error);
        }
    };

    resetPassword = async (req, res) => {
        try {
            const { username, newPassword } = req.body;
            const user = await userModel.findOne({ username });
            if (!user) {
                return res.status(404).send('Usuario no encontrado');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();
            res.render('reset-password-success', { title: 'Contraseña restablecida', mensaje: 'Contraseña restablecida exitosamente' });
        } catch (error) {
            logger.error(error);
            res.status(500).send('Error interno del servidor');
        }
    };
};

module.exports = ResetPasswordController;