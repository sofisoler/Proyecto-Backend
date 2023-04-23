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

cartRouter.post("/create", async (req, res) => {
        let newCart = await cartsManager.createCart();
        res.send(newCart);
});

cartRouter.post("/:cid/addProduct/:pid", async (req,res) => {
    const { cid, pid } = req.params
    let addProduct = await cartsManager.addProductInCart(cid, pid)
    res.send(addProduct);
});

cartRouter.delete('/:cid/deleteProduct/:pid', async (req, res) => {
    const { cid, pid } = req.params
    let deleteProduct = await cartsManager.deleteProduct(cid, pid);
    res.send(deleteProduct);
});

cartRouter.delete('/:cid/deleteProducts', async (req, res) => {
    const { cid } = req.params
    let deleteProducts = await cartsManager.deleteProducts(cid);
    res.send(deleteProducts);
});

module.exports = cartRouter