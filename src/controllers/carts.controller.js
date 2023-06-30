const { cartService } = require("../service");
const { logger } = require("../utils/logger");

class CartController {

    getCarts = async (req, res) => {
        try {
            let carts = await cartService.getItems({});
            res.send(carts);
        } catch (error) {
            logger.error(error);
        }
    };

    getCart = async (req, res) => {
        try {
            const { cid } = req.params
            let cartById = await cartService.getItemById(cid);
            const cartData = cartById.toObject();
            res.render('cart', { cart: cartData, user: req.session.user });
        } catch (error) {
            logger.error(error);
        }
    };

    createCart = async (req, res) => {
        try {
            let newCart = await cartService.createItem();
            res.send(newCart);
        } catch (error) {
            logger.error(error);
        }
    };
    
    updateCart =  async (req,res) => {
        try {
            const { cid, pid } = req.params
            let addProduct = await cartService.updateItem(cid, pid);
            res.send(addProduct);
        } catch (error) {
            logger.error(error);
        }
    };

    deleteProductInCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            let deleteProduct = await cartService.deleteItem(cid, pid);
            res.send(deleteProduct);
        } catch (error) {
            logger.error(error);
        }
    };

    deleteProductsInCart = async (req, res) => {
        try {
            const { cid } = req.params
            let deleteProducts = await cartService.deleteItems(cid);
            res.send(deleteProducts);
        } catch (error) {
            logger.error(error);
        }
    };

    confirmCheckout = async (req, res) => {};
};

module.exports = CartController