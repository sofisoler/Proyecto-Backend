const MongoSingleton = require("../utils/MongoSingleton");

let ProductDaos
let UserDaos
let CartDaos
let OrderDaos

switch ('MONGO') {

    case 'MONGO':

        MongoSingleton.getInstance()
        
        const ProductManagerMongo = require("./mongoDAO/product.mongo") 
        ProductDaos = ProductManagerMongo

        const UserManagerMongo = require("./mongoDAO/user.mongo")
        UserDaos = UserManagerMongo

        const CartManagerMongo = require("./mongoDAO/cart.mongo")
        CartDaos = CartManagerMongo

        const OrderManagerMongo = require("./mongoDAO/order.mongo")
        OrderDaos = OrderManagerMongo

        break;

    case 'MEMORY':

        const ProductManager = require("./memoryDAO/product.memory") 
        ProductDaos = ProductManager

        const CartManager = require("./memoryDAO/cart.memory") 
        CartDaos = CartManager

        break;

    case 'FILE':

        break;

    default:

        MongoSingleton.getInstance()

        break;
};

module.exports = {
    ProductDaos,
    UserDaos,
    CartDaos,
    OrderDaos
};