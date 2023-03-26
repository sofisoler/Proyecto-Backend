const { Router } = require('express')
const { CartManager } = require('../Daos/CartDaos/CartDaos');

const cartRouter = Router();

const carts = new CartManager();

cartRouter.post('/', async (req,res) => {
    const resp = await carts.createCart({products: []})
    res.send({resp})
});

cartRouter.post('/:cid/products/:pid', async (req,res) => {
    const {cid, pid} = req.params
    const resp = await carts.addProductInCart(parseInt(cid), parseInt(pid))
    res.send({resp})
});

cartRouter.get('/:cid', async (req,res) => {
    const {cid} = req.params
    const resp = await carts.getCartById(parseInt(cid))
    res.send({resp})
});

module.exports = cartRouter