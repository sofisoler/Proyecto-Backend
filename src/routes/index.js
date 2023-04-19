const { Router } = require('express')
const productRouter = require('./product.router')
const cartRouter = require('./cart.router')
const viewsRouter = require('./views.router');
const { uploader } = require('../utils/uploader');

const router = Router();

router.use('/views', viewsRouter)
router.use('/api/products', productRouter)
router.use('/api/cart', cartRouter)

router.post('/upload', uploader.single('myFile'),(req, res)=>{
    res.send('File uploaded successfully')
})

module.exports = router