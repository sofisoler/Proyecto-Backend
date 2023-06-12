const { Router } = require('express');
const userRouter = require('./user.router');
const productRouter = require('./product.router');
const cartRouter = require('./cart.router');
const chatRouter = require('./chat.router');
const { uploader } = require('../utils/uploader');
const cookieRouter = require('./cookie.router');
const sessionRouter = require('./session.router');

const router = Router();

router.use('/chat', chatRouter)
router.use('/api/users', userRouter)
router.use('/api/products', productRouter)
router.use('/api/cart', cartRouter)
router.use('/cookie', cookieRouter)
router.use('/session', sessionRouter)

router.post('/upload', uploader.single('myFile'),(req, res)=>{
    res.send('File uploaded successfully')
})

module.exports = router