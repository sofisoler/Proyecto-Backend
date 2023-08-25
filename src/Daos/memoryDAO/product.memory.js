const fs = require("fs");
const { logger } = require("../../utils/logger");

class ProductManager {

    constructor() {
        this.path = "./src/dbJson/product.json";
        this.products = [];
    };

    static id = 0;

    // Lee los productos desde el archivo
    readProducts = async () => {
        let response = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(response);
    };

    // Obtiene todos los productos
    getProducts = async () => {
        let productsList = await this.readProducts();
        return productsList;
    };

    // Obtiene un producto por su ID
    getProductById = async (productId) => {
        let productsList = await this.readProducts();
        const product = productsList.find(product => product.id === productId);
        if (!product) {
            logger.info('Producto no encontrado');
        } else {
            logger.info(product);
        }
    };

    // Agrega un nuevo producto y lo guarda en el archivo
    addProduct = async (title, description, thumbnail, price, code, stock) => {
        ProductManager.id++;
        let newProduct = {
            title,
            description,
            thumbnail,
            price,
            code,
            stock,
            id: ProductManager.id
        };
        this.products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    };

    // Actualiza un producto existente
    updateProduct = async (id, updatedProduct) => {
        let productsList = await this.readProducts();
        const productIndex = productsList.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            productsList[productIndex] = { ...updatedProduct, id };
            await fs.promises.writeFile(this.path, JSON.stringify(productsList));
            logger.info("Producto actualizado exitosamente");
        } else {
            logger.info("Producto no encontrado");
        }
    };

    // Elimina un producto por su ID
    deleteProduct = async (productId) => {
        let productsList = await this.readProducts();
        let updatedProducts = productsList.filter(product => product.id !== productId);
        await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));
        logger.info("Producto eliminado exitosamente");
    };
};

module.exports = { ProductManager };