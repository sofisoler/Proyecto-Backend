const UserManagerMongo = require("../Daos/mongoDAO/user.mongo");
const ProductManagerMongo = require("../Daos/mongoDAO/product.mongo");
const CartManagerMongo = require("../Daos/mongoDAO/cart.mongo");

const userService = new UserManagerMongo();
const productService = new ProductManagerMongo();
const cartService = new CartManagerMongo();

module.exports = {
    userService,
    productService,
    cartService
};