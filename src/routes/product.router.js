const { Router } = require("express");
const ProductController = require("../controllers/products.controller");
const { authorization } = require("../passport/authorizationPassport");

const productRouter = Router();

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, uploadProductThumbnail, getProductThumbnail, showUploadDocumentsView } = new ProductController();

productRouter.get('/', getProducts);

productRouter.get('/:pid', getProduct);

productRouter.post('/', createProduct);

productRouter.put('/:pid', updateProduct);

productRouter.delete('/:pid', deleteProduct);

productRouter.post('/:pid/thumbnail', authorization, uploadProductThumbnail);

productRouter.get('/:pid/thumbnail', authorization, getProductThumbnail);

productRouter.get('/:pid/thumbnail/upload', authorization, showUploadDocumentsView);

module.exports = productRouter;