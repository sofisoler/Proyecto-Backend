class OrderDto {

    constructor(order) {
        this.user = order.user;
        this.products = order.products.map(product => ({
            product: product.product,
            quantity: product.quantity
        }));
        this.total = order.total;
        this.created = order.created;
    };
};

module.exports = { OrderDto };