const { logger } = require("../utils/logger");

class CookieController {

    // Configurar una cookie
    setCookie = (req, res) => {
        try {
            res.cookie('ProjectCookie', 'Cookie value', { maxAge: 10000000 }).send('Cookie establecida');
        } catch (error) {
            logger.error(error);
        }
    };

    // Obtener todas las cookies
    getCookies = (req, res) => {
        try {
            res.send(req.cookies);
        } catch (error) {
            logger.error(error);
        }
    };

    // Configurar una cookie firmada
    setSignedCookie = (req, res) => {
        try {
            const { username, password } = req.body;
            res.cookie('username', username, { maxAge: 10000000, signed: true }).send({ message: 'Cookie establecida' });
        } catch (error) {
            logger.error(error);
        }
    };

    // Obtener todas las cookies firmadas
    getSignedCookies = (req, res) => {
        try {
            res.send(req.signedCookies);
        } catch (error) {
            logger.error(error);
        }
    };

    // Eliminar una cookie
    deleteCookie = (req, res) => {
        try {
            res.clearCookie('CoderCookie').send('Cookie eliminada');
        } catch (error) {
            logger.error(error);
        }
    };
}

module.exports = CookieController;