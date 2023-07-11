const { Router } = require('express');
const ResetPasswordController = require('../controllers/reset-password.controller');

const resetPasswordRouter = Router();

const { renderResetPassword, emailResetPassword } = new ResetPasswordController();

resetPasswordRouter.get('/', renderResetPassword);

resetPasswordRouter.get('/email', emailResetPassword);

module.exports = resetPasswordRouter