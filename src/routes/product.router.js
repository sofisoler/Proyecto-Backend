const { Router } = require('express')
const { ProductManager } = require('../Daos/ProductDaos/ProductDaos');

const productRouter = Router();

const products = new ProductManager();
const readProducts = products.readProducts();

productRouter.get("/", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if(!limit) return res.send(await readProducts)
    let allProducts = await readProducts;
    let productLimit = allProducts.slice(0, limit);
    res.send(productLimit);
});

productRouter.get("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find(product => product.id === id);
    res.send(productById);
});

module.exports = productRouter

// products.addProduct("Product1", "Description1", "Image1", 2000, "0002", 50)
// products.addProduct("Product2", "Description2", "Image2", 8000, "0003", 50)
// products.addProduct("Product3", "Description3", "Image3", 3000, "0004", 50)
// products.addProduct("Product4", "Description4", "Image4", 5000, "0005", 50)