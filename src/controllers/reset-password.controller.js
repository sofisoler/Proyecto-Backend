const { logger } = require("../utils/logger");

class ResetPasswordController {

    renderResetPassword = (req, res) => {
        try {
            res.render('reset-password');
        } catch (error) {
            logger.error(error);
        }
    };
};

module.exports = ResetPasswordController