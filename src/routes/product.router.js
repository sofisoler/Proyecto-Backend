const { Router } = require("express");
const ProductController = require("../controllers/products.controller");
const { authorization, checkPremiumUser, ensureAuthenticated } = require("../passport/authorizationPassport");

const productRouter = Router();

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, uploadProductThumbnail, getProductThumbnail, showUploadDocumentsView } = new ProductController();

productRouter.get('/', getProducts);

productRouter.get('/:pid', getProduct);

productRouter.post('/', authorization, createProduct);

productRouter.put('/:pid', ensureAuthenticated, checkPremiumUser, updateProduct);

productRouter.delete('/:pid', ensureAuthenticated, checkPremiumUser, deleteProduct);

productRouter.post('/:pid/thumbnail', authorization, uploadProductThumbnail);

productRouter.get('/:pid/thumbnail', authorization, getProductThumbnail);

productRouter.get('/:pid/thumbnail/upload', authorization, showUploadDocumentsView);

module.exports = productRouter;