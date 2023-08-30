const { Router } = require('express');
const sessionRouter = require('./session.router');
const homeRouter = require('./home.router');
const userRouter = require('./user.router');
const orderRouter = require('./order.router');
const productRouter = require('./product.router');
const cartRouter = require('./cart.router');
const chatRouter = require('./chat.router');
const cookieRouter = require('./cookie.router');
const resetPasswordRouter = require('./reset-password.router');
const errorHandler = require('../middleware/errors');
const realTimeProductsRouter = require('./realTimeProducts.router');

const router = Router();

router.use('/session', sessionRouter);
router.use('/', homeRouter);
router.use('/api/users', userRouter);
router.use('/api/orders', orderRouter);
router.use('/api/products', productRouter);
router.use('/api/cart', cartRouter);
router.use('/chat', chatRouter);
router.use('/cookie', cookieRouter);
router.use('/reset-password', resetPasswordRouter);
router.use('/realTimeProducts', realTimeProductsRouter);

router.use(errorHandler);

module.exports = router;