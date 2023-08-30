const { Router } = require("express");
const ResetPasswordController = require("../controllers/reset-password.controller");

const resetPasswordRouter = Router();

const { renderResetPassword, emailResetPassword, resetPassword, enterEmail } = new ResetPasswordController();

resetPasswordRouter.get('/', renderResetPassword);

resetPasswordRouter.get('/email', enterEmail);

resetPasswordRouter.post('/email', emailResetPassword);

resetPasswordRouter.post('/reset', resetPassword);

module.exports = resetPasswordRouter;