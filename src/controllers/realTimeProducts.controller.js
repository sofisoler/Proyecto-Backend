const { logger } = require("../utils/logger");

class realTimeProductsController {

    renderRealTimeProductsPage = (req, res) => {
        try {
            res.render('realTimeProducts');
        } catch (error) {
            logger.error(error);
        }
    };
};

module.exports = realTimeProductsController;