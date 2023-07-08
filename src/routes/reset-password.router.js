const { Router } = require('express');
const ResetPasswordController = require('../controllers/reset-password.controller');

const resetPasswordRouter = Router();

const { renderResetPassword } = new ResetPasswordController();

resetPasswordRouter.get('/', renderResetPassword);

module.exports = resetPasswordRouter