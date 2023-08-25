const { Router } = require('express');
const sessionRouter = require('./session.router');
const userRouter = require('./user.router');
const orderRouter = require('./order.router');
const productRouter = require('./product.router');
const cartRouter = require('./cart.router');
const chatRouter = require('./chat.router');
const cookieRouter = require('./cookie.router');
const compression = require('express-compression');
const errorHandler = require('../middleware/errors');
const mockingController = require('../controllers/mocking.controller');
const resetPasswordRouter = require('./reset-password.router');

const router = Router();

router.use('/session', sessionRouter);
router.use('/api/users', userRouter);
router.use('/api/orders', orderRouter);
router.use('/chat', chatRouter);
router.use('/api/products', productRouter);
router.use('/api/cart', cartRouter);
router.use('/cookie', cookieRouter);
router.use('/reset-password', resetPasswordRouter);

router.use(compression({
    brotli: {
        enabled: true,
        zlib: {}
    }
}));

router.use(errorHandler);

router.get('/mockingproducts', mockingController.getMockingProducts);

module.exports = router;