const { Router } = require("express");
const realTimeProductsController = require("../controllers/realTimeProducts.controller");

const realTimeProductsRouter = Router();

const { renderRealTimeProductsPage } = new realTimeProductsController();

realTimeProductsRouter.get('/', renderRealTimeProductsPage);

module.exports = realTimeProductsRouter;