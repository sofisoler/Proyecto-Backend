const { Router } = require('express');
const userRouter = require('./user.router');
const productRouter = require('./product.router');
const cartRouter = require('./cart.router');
const chatRouter = require('./chat.router');
const { uploader } = require('../utils/uploader');
const cookieRouter = require('./cookie.router');
const sessionRouter = require('./session.router');
const orderRouter = require('./order.router');
const mailRouter = require('./mail.router');
const smsRouter = require('./sms.router');
const compression = require('express-compression');
const errorHandler = require('../middleware/errors');
const mockingController = require('../controllers/mocking.controller');

const router = Router();

router.use('/chat', chatRouter)
router.use('/api/users', userRouter)
router.use('/api/products', productRouter)
router.use('/api/cart', cartRouter)
router.use('/cookie', cookieRouter)
router.use('/session', sessionRouter)
router.use('/api/orders', orderRouter)
router.use('/email', mailRouter)
router.use('/sms', smsRouter)

router.use(compression({
    brotli: {
        enabled: true,
        zlib: {}
    }
}));

router.use(errorHandler);

router.post('/upload', uploader.single('myFile'),(req, res)=>{
    res.send('File uploaded successfully')
})

router.get('/mockingproducts', mockingController.getMockingProducts);

module.exports = router