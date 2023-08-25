const { CartDto } = require("../dto/cart.dto");
const { cartService, productService } = require("../service");
const { logger } = require("../utils/logger");

class CartController {

    checkLoginStatus = (req, res) => {
        try {
            if (req.session.user) {
                res.status(200).json({ loggedIn: true });
            } else {
                res.status(200).json({ loggedIn: false });
            }
        } catch (error) {
            logger.error(error);
        }
    };

    getCarts = async (req, res) => {
        try {
            return await cartService.getItems({});
        } catch (error) {
            logger.error(error);
        }
    };

    getCartOrCheckout = async (req, res, viewName) => {
        try {
            const { cid } = req.params;
            let cartById = await cartService.getItemById(cid);
            const cartData = cartById.toObject();
            const cartDto = new CartDto(cartData);
            const totalPrice = await this.calculateTotalPrice(cartData);
            let pageTitle = '';
            if (viewName === 'cart') {
                pageTitle = 'Carrito';
            } else if (viewName === 'checkout') {
                pageTitle = 'Confirmar pedido';
            }
            res.render(viewName, {
                title: pageTitle,
                user: req.session.user,
                cart: cartDto,
                totalPrice
            });
        } catch (error) {
            logger.error(error);
        }
    };

    getCart = async (req, res) => {
        await this.getCartOrCheckout(req, res, 'cart');
    };
    
    confirmCheckout = async (req, res) => {
        await this.getCartOrCheckout(req, res, 'checkout');
    };

    createCart = async (req, res) => {
        try {
            return await cartService.createItem();
        } catch (error) {
            logger.error(error);
        }
    };

    createCartForCurrentUser = async (req, res) => {
        try {
            const userId = req.session.user._id;
            const existingCart = await cartService.getCartByUser(userId);
            if (existingCart) {
                return res.redirect(`/api/cart/${existingCart._id}`);
            } else {
                const newCart = await cartService.createCartForUser(userId);
                res.redirect(`/api/cart/${newCart._id}`);
            }
        } catch (error) {
            logger.error(error);
            res.status(500).json({ error: 'Error al crear o acceder al carrito' });
        }
    };

    updateCart = async (req, res) => {
        try {
            const { pid } = req.params;
            const userId = req.session.user._id;
            const existingCart = await cartService.getCartByUser(userId);
            if (existingCart) {
                const cartId = existingCart._id;
                const existingProduct = existingCart.products.find(item => item.product._id == pid);
                if (existingProduct) {
                    // Si el producto ya existe en el carrito, incrementa su cantidad
                    existingProduct.quantity += 1;
                    await existingCart.save();
                } else {
                    await cartService.updateItem(cartId, pid);
                }
            } else {
                const newCart = await cartService.createCartForUser(userId);
                await cartService.updateItem(newCart._id, pid);
            }
            const mensaje = 'Producto agregado al carrito';
            res.status(200).json({ mensaje });
        } catch (error) {
            logger.error(error);
        }
    };

    updateProductQuantity = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { action } = req.body;
            // Obtener el carrito y el producto
            const cart = await cartService.getItemById(cid);
            const productInCart = cart.products.find(item => item.product._id.toString() === pid);
            if (productInCart) {
                // Incrementar o disminuir la cantidad según la acción
                if (action === 'increase') {
                    productInCart.quantity += 1;
                } else if (action === 'decrease' && productInCart.quantity > 1) {
                    productInCart.quantity -= 1;
                }
                // Guardar los cambios en el carrito
                await cart.save();
                res.status(200).json({
                    mensaje: 'Cantidad actualizada',
                    newQuantity: productInCart.quantity  // Agrega el nuevo valor de la cantidad
                });                
            } else {
                const mensaje = 'Producto no encontrado en el carrito';
                res.status(404).json({ mensaje });
            }
        } catch (error) {
            logger.error(error);
        }
    };

    deleteProductInCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            await cartService.deleteProductInCart(cid, pid);
            const mensaje = 'Producto eliminado del carrito';
            res.status(200).json({ mensaje });
        } catch (error) {
            logger.error(error);
        }
    };

    deleteProductsInCart = async (req, res) => {
        try {
            const { cid } = req.params;
            let deleteProducts = await cartService.deleteItems(cid);
            res.send(deleteProducts);
        } catch (error) {
            logger.error(error);
        }
    };

    calculateTotalPrice = async (cart) => {
        try {
            let totalPrice = 0;
            for (const cartItem of cart.products) {
                const product = await productService.getItemById(cartItem.product._id);
                totalPrice += product.price * cartItem.quantity;
            }
            return totalPrice;
        } catch (error) {
            logger.error(error);
        }
    };
};

module.exports = CartController;