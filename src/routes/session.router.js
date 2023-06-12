const { Router } = require('express');
const SessionController = require('../controllers/sessions.controller');
const passport = require('passport');
const { authToken } = require('../utils/jsonwebtoken');

const sessionRouter = Router();

const { renderLoginPage, loginSession, getSession, renderRegisterPage, registerSession, authenticateGithubCallback, failRegister, updatePassword, logoutSession } = new SessionController();

sessionRouter.get('/', renderLoginPage);

sessionRouter.post('/login', loginSession);

sessionRouter.get('/current', authToken, getSession);

sessionRouter.get('/register', renderRegisterPage);

sessionRouter.post('/register', registerSession);

sessionRouter.get('/github', passport.authenticate('github'));

sessionRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/session/failregister' }), authenticateGithubCallback);

sessionRouter.get('/failregister', failRegister);

sessionRouter.put('/recoverypass', updatePassword);

sessionRouter.get('/logout', logoutSession);

module.exports = sessionRouter