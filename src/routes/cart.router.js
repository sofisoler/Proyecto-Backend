const { Router } = require("express");
const CartController = require("../controllers/carts.controller");

const cartRouter = Router();

const { checkLoginStatus, getCarts, getCart, createCart, createCartForCurrentUser, updateCart, deleteProductInCart, deleteProductsInCart, confirmCheckout, updateProductQuantity } = new CartController();

cartRouter.get('/checkLogin', checkLoginStatus);

cartRouter.get('/carts', getCarts);

cartRouter.get('/:cid', getCart);

cartRouter.post('/create', createCart);

cartRouter.get('/', createCartForCurrentUser);

cartRouter.post('/:cid/addProductInCart/:pid', updateCart);

cartRouter.delete('/:cid/deleteProductInCart/:pid', deleteProductInCart);

cartRouter.delete('/:cid/deleteProductsInCart', deleteProductsInCart);

cartRouter.post('/:cid/confirmCheckout', confirmCheckout);

cartRouter.post('/:cid/updateProductQuantity/:pid', updateProductQuantity);

module.exports = cartRouter;