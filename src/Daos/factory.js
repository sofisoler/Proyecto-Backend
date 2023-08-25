const MongoSingleton = require("../utils/MongoSingleton");

let ProductDaos;
let UserDaos;
let CartDaos;
let OrderDaos;

switch ('MONGO') {

    case 'MONGO':
        // Inicializar la conexión a la base de datos Mongo
        MongoSingleton.getInstance();

        // Importar los DAOs de Mongo
        const ProductManagerMongo = require("./mongoDAO/product.mongo");
        ProductDaos = ProductManagerMongo;

        const UserManagerMongo = require("./mongoDAO/user.mongo");
        UserDaos = UserManagerMongo;

        const CartManagerMongo = require("./mongoDAO/cart.mongo");
        CartDaos = CartManagerMongo;

        const OrderManagerMongo = require("./mongoDAO/order.mongo");
        OrderDaos = OrderManagerMongo;

        break;

    case 'MEMORY':
        // Importar los DAOs de memoria
        const { ProductManager } = require("./memoryDAO/product.memory");
        ProductDaos = ProductManager;

        const { CartManager } = require("./memoryDAO/cart.memory");
        CartDaos = CartManager;

        break;

    case 'FILE':
        // DAOs de archivo
        break;

    default:
        // En caso de configuración no válida, usar Mongo por defecto
        MongoSingleton.getInstance();

        break;
};

module.exports = {
    ProductDaos,
    UserDaos,
    CartDaos,
    OrderDaos
};