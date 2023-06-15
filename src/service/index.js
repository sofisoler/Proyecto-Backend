const OrderRepository = require("../repositories/orders.repository");
const UserRepository = require("../repositories/users.repository");
const ProductRepository = require("../repositories/products.repository");
const CartRepository = require("../repositories/cart.repository");
const { OrderDaos, UserDaos, ProductDaos, CartDaos } = require("../Daos/factory");

const userService = new UserRepository(new UserDaos());
const productService = new ProductRepository(new ProductDaos());
const cartService = new CartRepository(new CartDaos());
const orderService = new OrderRepository(new OrderDaos());

module.exports = {
    userService,
    productService,
    cartService,
    orderService
};