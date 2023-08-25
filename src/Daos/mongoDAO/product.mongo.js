const { productsModel } = require("../mongo/models/products.model");

class ProductManagerMongo {

    // Obtener todos los productos
    get = async ({ page, limit, query = '' }) => {
        return await productsModel.paginate({}, { limit, page, lean: true });
    };

    // Obtener un producto por su ID
    getById = async (pid) => {
        return await productsModel.findById({ _id: pid });
    };
    
    // Crear un nuevo producto
    create = async (newProduct) => {
        return await productsModel.create(newProduct);
    };

    // Actualizar un producto por su ID
    update = async (pid, productToReplace) => {
        return await productsModel.updateOne({ _id: pid }, productToReplace);
    };

    // Eliminar un producto por su ID
    delete = async (pid) => {
        return await productsModel.deleteOne({ _id: pid });
    };
}

module.exports = ProductManagerMongo;