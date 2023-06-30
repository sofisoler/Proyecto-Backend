const fs = require('fs');
const { logger } = require('../../utils/logger');

class ProductManager {

    constructor() {
        this.path = "./src/dbJson/product.json"
        this.products = []
    };

    static id = 0

    addProduct = async (title, description, thumbnail, price, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            thumbnail,
            price,
            code,
            stock,
            id: ProductManager.id
        };

        this.products.push(newProduct)

        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    };

    readProducts = async () => {
        let respuesta = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(respuesta)
    };

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return logger.info(respuesta2)
    };

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id === id)){
            logger.info("Product not found")
        } else {
            logger.info(respuesta3.find(product => product.id === id))
        }
    };

    deleteProduct = async (id) => {
        let respuesta3 = await this.readProducts()
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(productFilter))
        logger.info("Product deleted successfully")
    };

    updateProducts = async ({id, ...product}) => {
        await this.deleteProduct(id);
        let productOld = await this.readProducts()
        let productsModified = [{...product, id}, ...productOld]
        await fs.promises.writeFile(this.path, JSON.stringify(productsModified))
    };
};

module.exports = { ProductManager };