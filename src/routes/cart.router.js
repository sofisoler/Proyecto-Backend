const { Router } = require("express");
const CartController = require("../controllers/carts.controller");

const cartRouter = Router();

const { getCarts, getCart, createCart, updateCart, deleteProductInCart, deleteProductsInCart } = new CartController();

cartRouter.get("/", getCarts);

cartRouter.get("/:cid", getCart);

cartRouter.post("/create", createCart);

cartRouter.post("/:cid/addProductInCart/:pid", updateCart);

cartRouter.delete('/:cid/deleteProductInCart/:pid', deleteProductInCart);

cartRouter.delete('/:cid/deleteProductsInCart', deleteProductsInCart);

module.exports = cartRouter