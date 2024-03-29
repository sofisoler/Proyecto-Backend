const { Router } = require("express");
const CookieController = require("../controllers/cookies.controller");

const cookieRouter = Router();

const { setCookie, getCookies, setSignedCookie, getSignedCookies, deleteCookie } = new CookieController();

cookieRouter.get('/set', setCookie);

cookieRouter.get('/get', getCookies);

cookieRouter.post('/setSigned', setSignedCookie);

cookieRouter.get('/getSigned', getSignedCookies);

cookieRouter.get('/delete', deleteCookie);

module.exports = cookieRouter;