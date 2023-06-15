const { cartService } = require("../service");

class CartController {

    getCarts = async (req, res) => {
        try {
            let carts = await cartService.getItems({});
            res.send(carts);
        } catch (error) {
            console.log(error);
        }
    };

    getCart = async (req, res) => {
        try {
            const { cid } = req.params
            let cartById = await cartService.getItemById(cid);
            const cartData = cartById.toObject();
            res.render('cart', { cart: cartData, user: req.session.user });
        } catch (error) {
            console.log(error);
        }
    };

    createCart = async (req, res) => {
        try {
            let newCart = await cartService.createItem();
            res.send(newCart);
        } catch (error) {
            console.log(error);
        }
    };
    
    updateCart =  async (req,res) => {
        try {
            const { cid, pid } = req.params
            let addProduct = await cartService.updateItem(cid, pid);
            res.send(addProduct);
        } catch (error) {
            console.log(error);
        }
    };

    deleteProductInCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            let deleteProduct = await cartService.deleteItem(cid, pid);
            res.send(deleteProduct);
        } catch (error) {
            console.log(error);
        }
    };

    deleteProductsInCart = async (req, res) => {
        try {
            const { cid } = req.params
            let deleteProducts = await cartService.deleteItems(cid);
            res.send(deleteProducts);
        } catch (error) {
            console.log(error);
        }
    };

    confirmCheckout = async (req, res) => {};
};

module.exports = CartController