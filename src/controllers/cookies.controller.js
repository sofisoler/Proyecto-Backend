const { logger } = require("../utils/logger");

class CookieController {

    setCookie = (req, res) => {
        try {
            res.cookie('ProjectCookie', 'Cookie value', {maxAge: 10000000}).send('Set cookie');
        } catch (error) {
            logger.error(error);
        }
    };

    renderLoginPage = (req,res) => {
        try {
            res.render('login', {});
        } catch (error) {
            logger.error(error);
        }
    };

    getCookies = (req, res) => {
        try {
            res.send(req.cookies);
        } catch (error) {
            logger.error(error);
        }
    };

    setSignedCookie = (req, res) => {
        try {
            const { username, password } = req.body
            res.cookie('username', username, { maxAge: 10000000, signed: true}).send({message: 'Set cookie'});
        } catch (error) {
            logger.error(error);
        }
    };

    getSignedCookies = (req, res) => {
        try {
            res.send(req.signedCookies);
        } catch (error) {
            logger.error(error);
        }
    };

    deleteCookie = (req, res) => {
        try {
            res.clearCookie('CoderCookie').send('Cookie removed');
        } catch (error) {
            logger.error(error);
        }
    };
};

module.exports = CookieController