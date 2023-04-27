const { Router } = require('express');
const userRouter = require('./users.router');
const productRouter = require('./product.router');
const cartRouter = require('./cart.router');
const viewsRouter = require('./views.router');
const { uploader } = require('../utils/uploader');
const cookieRouter = require('./cookie.router');
const sessionRouter = require('./session.router');

const router = Router();

router.use('/views', viewsRouter)
router.use('/api/users', userRouter)
router.use('/api/products', productRouter)
router.use('/api/cart', cartRouter)
router.use('/cookie', cookieRouter)
router.use('/session', sessionRouter)

router.post('/upload', uploader.single('myFile'),(req, res)=>{
    res.send('File uploaded successfully')
})

module.exports = router