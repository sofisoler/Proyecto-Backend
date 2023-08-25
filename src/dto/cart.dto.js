class CartDto {

    constructor(cart) {
        this._id = cart._id;
        this.user = cart.user;
        this.products = cart.products.map(product => ({
            product: product.product,
            quantity: product.quantity
        }));
    };
};

module.exports = { CartDto };