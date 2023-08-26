const { Router } = require("express");
const HomeController = require("../controllers/home.controller");

const homeRouter = Router();

const { renderHomePage } = new HomeController();

homeRouter.get('/', renderHomePage);

module.exports = homeRouter;