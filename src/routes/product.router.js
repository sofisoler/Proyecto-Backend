const { Router } = require('express');
const ProductController = require('../controllers/products.controller');

const productRouter = Router();

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = new ProductController();

productRouter.get("/", getProducts);

productRouter.get("/:pid", getProduct);

productRouter.post("/", createProduct);

productRouter.put('/:pid', updateProduct);

productRouter.delete('/:pid', deleteProduct);

module.exports = productRouter