const { cartService } = require("../service");

class CartController {

    getCarts = async (req, res) => {
        try {
            let carts = await cartService.getCarts();
            res.send(carts);
        } catch (error) {
            console.log(error);
        }
    };

    getCart = async (req, res) => {
        try {
            const { cid } = req.params
            let cartById = await cartService.getCartById(cid);
            res.send(cartById);
        } catch (error) {
            console.log(error);
        }
    };

    createCart = async (req, res) => {
        try {
            let newCart = await cartService.createCart();
            res.send(newCart);
        } catch (error) {
            console.log(error);
        }
    };

    updateCart =  async (req,res) => {
        try {
            const { cid, pid } = req.params
            let addProduct = await cartService.addProductInCart(cid, pid)
            res.send(addProduct);
        } catch (error) {
            console.log(error);
        }
    };

    deleteProductInCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            let deleteProduct = await cartService.deleteProduct(cid, pid);
            res.send(deleteProduct);
        } catch (error) {
            console.log(error);
        }
    };

    deleteProductsInCart = async (req, res) => {
        try {
            const { cid } = req.params
            let deleteProducts = await cartService.deleteProducts(cid);
            res.send(deleteProducts);
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = CartController