const { logger } = require("../utils/logger");

class HomeController {

    renderHomePage = (req, res) => {
        try {
            res.render('home', {
                title: 'Inicio',
                user: req.session.user,
                mensaje: req.query.mensaje
            });
        } catch (error) {
            logger.error(error);
        }
    };
}

module.exports = HomeController;