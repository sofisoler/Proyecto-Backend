const ProductManagerMongo = require("../Daos/mongoDAO/product.mongo");
const CartManagerMongo = require("../Daos/mongoDAO/cart.mongo");
const OrderRepository = require("../repositories/orders.repository");
const { OrderDaos, UserDaos } = require("../Daos/factory");
const UserRepository = require("../repositories/users.repository");

const userService = new UserRepository(new UserDaos());
const productService = new ProductManagerMongo();
const cartService = new CartManagerMongo();
const orderService = new OrderRepository(new OrderDaos());

module.exports = {
    userService,
    productService,
    cartService,
    orderService
};