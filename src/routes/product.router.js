const { Router } = require('express');
const ProductController = require('../controllers/products.controller');

const productRouter = Router();

const { getProducts, getProduct, createProduct, updateProducts, deleteProduct } = new ProductController();

productRouter.get("/", getProducts);

productRouter.get("/:pid", getProduct);

productRouter.post("/", createProduct);

productRouter.put('/:pid', updateProducts);

productRouter.delete('/:pid', deleteProduct);

module.exports = productRouter