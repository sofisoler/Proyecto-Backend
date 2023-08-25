const fs = require("fs");

class CartManager {
    constructor() {
        this.path = './src/dbJson/cart.json';
    };

    // Lee los datos del archivo de carritos
    readCart = async () => {
        try {
            const carts = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(carts);
        } catch (error) {
            return [];
        }
    };

    // Obtiene un carrito por su ID
    getCartById = async (cartId) => {
        let cartsDb = await this.readCart();
        let cart = cartsDb.find(cart => cart.id === cartId);
        if (!cart) {
            return "No existe el carrito";
        }
        return cart;
    };

    // Crea un nuevo carrito y lo guarda en el archivo
    createCart = async (cart) => {
        let carts = await this.readCart();
        if (carts.length === 0) {
            carts.push({ id: 1, ...cart });
        } else {
            carts.push({ id: carts.length + 1, ...cart });
        }
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
        return carts;
    };

    // Agrega un producto al carrito especificado
    addProductInCart = async (cartId, productId) => {
        try {
            let cartsDb = await this.readCart();
            const cartIndex = cartsDb.findIndex(cart => cart.id === cartId);
            if (cartIndex === -1) {
                return "No existe el carrito";
            }
            const idxProduct = cartsDb[cartIndex].products.findIndex(prod => prod.id === productId);
            if (idxProduct === -1) {
                cartsDb[cartIndex].products.push({ id: productId, quantity: 1 });
            } else {
                cartsDb[cartIndex].products[idxProduct].quantity++;
            }
            await fs.promises.writeFile(this.path, JSON.stringify(cartsDb, null, 2), 'utf-8');
            return cartsDb;
        } catch (error) {
            return new Error(error);
        }
    };

    // Elimina un producto de un carrito
    removeProductFromCart = async (cartId, productId) => {
        try {
            let cartsDb = await this.readCart();
            const cartIndex = cartsDb.findIndex(cart => cart.id === cartId);
            if (cartIndex === -1) {
                return "No existe el carrito";
            }
            const productIndex = cartsDb[cartIndex].products.findIndex(prod => prod.id === productId);
            if (productIndex !== -1) {
                cartsDb[cartIndex].products.splice(productIndex, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(cartsDb, null, 2), 'utf-8');
            }
            return cartsDb;
        } catch (error) {
            return new Error(error);
        }
    };
};

module.exports = { CartManager };