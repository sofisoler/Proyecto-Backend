const { Router } = require("express");
const { CartManagerMongo } = require("../Daos/CartDaos/cartManagerMongo");

const cartRouter = Router();

const cartsManager = new CartManagerMongo();

cartRouter.get("/", async (req, res) => {
    let carts = await cartsManager.getCarts();
    res.send(carts);
});

cartRouter.get("/:cid", async (req, res) => {
    const { cid } = req.params
    let cartById = await cartsManager.getCartById(cid);
    res.send(cartById);
});

cartRouter.post("/", async (req, res) => {
        let resp = await cartsManager.createCart({products: []})
        res.send({resp})
});

cartRouter.post("/:cid/products/:pid", async (req,res) => {
    const { cid, pid } = req.params
    let resp = await cartsManager.addProductInCart(cid, pid)
    res.send({resp})
});

module.exports = cartRouter