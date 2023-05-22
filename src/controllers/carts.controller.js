const { CartManagerMongo } = require("../Daos/CartDaos/cartManagerMongo");

const cartsManager = new CartManagerMongo();

class CartController {

    getCarts = async (req, res) => {
        try {
            let carts = await cartsManager.getCarts();
            res.send(carts);
        } catch (error) {
            console.log(error);
        }
    };

    getCart = async (req, res) => {
        try {
            const { cid } = req.params
            let cartById = await cartsManager.getCartById(cid);
            res.send(cartById);
        } catch (error) {
            console.log(error);
        }
    };

    createCart = async (req, res) => {
        try {
            let newCart = await cartsManager.createCart();
            res.send(newCart);
        } catch (error) {
            console.log(error);
        }
    };

    updateCart =  async (req,res) => {
        try {
            const { cid, pid } = req.params
            let addProduct = await cartsManager.addProductInCart(cid, pid)
            res.send(addProduct);
        } catch (error) {
            console.log(error);
        }
    };

    deleteProductInCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            let deleteProduct = await cartsManager.deleteProduct(cid, pid);
            res.send(deleteProduct);
        } catch (error) {
            console.log(error);
        }
    };

    deleteProductsInCart = async (req, res) => {
        try {
            const { cid } = req.params
            let deleteProducts = await cartsManager.deleteProducts(cid);
            res.send(deleteProducts);
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = CartController