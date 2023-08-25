const path = require("path");
const { ProductDto } = require("../dto/product.dto");
const { productService } = require("../service");
const { logger } = require("../utils/logger");
const { uploader } = require("../utils/uploader");

class ProductController {

    getProducts = async (req, res) => {
        try {
            const mensaje = req.query.mensaje || '';
            const login = req.session.user;
            const { page = 1, limit = 10 } = req.query;
            const { docs, 
                hasPrevPage,
                prevPage,
                hasNextPage,
                nextPage, 
            } = await productService.getItems({ page, limit });
            if (!docs) {
                return res.status(400).send('No hay productos');
            }
            const productDtos = docs.map(product => new ProductDto(product));
            res.status(200).render('product', {
                title: 'Productos',
                mensaje: mensaje,
                user: login,
                products: productDtos,
                hasPrevPage,
                prevPage,
                hasNextPage,
                nextPage, 
            });
        } catch (error) {
            logger.error(error);
        }
    };

    getProduct = async (req, res) => {
        try {
            const { pid } = req.params;
            return await productService.getItemById(pid);
        } catch (error) {
            logger.error(error);
        }
    };

    createProduct = async (req, res) => {
        try {
            let { title, description, thumbnail, price, code, stock } = req.body;
            if (!title || !description || !thumbnail || !price || !code || !stock) {
                return res.status(400).send({ message: 'Corroborar que esten todos los datos' });
            }
            let addedProduct = await productService.createItem({ title, description, thumbnail, price, code, stock });
            res.status(201).send({ 
                addedProduct,
                message: 'Producto creado' 
            })
        } catch (error) {
            logger.error(error);
        }
    };

    updateProduct =  async (req, res) => {
        try {
            const { pid } = req.params;
            let productToReplace = req.body;
            if (!productToReplace.title || !productToReplace.description || !productToReplace.thumbnail || !productToReplace.price || !productToReplace.code || !productToReplace.stock) {
                return res.status(400).send({ message: 'Corroborar que esten todos los datos' });
            }
            let result = await productService.updateItem(pid, productToReplace);
            res.status(201).send({ 
                products: result,
                message: 'Producto modificado'
            })
        } catch (error) {
            logger.error(error);
        }
    };

    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params;
            let result = await productService.deleteItem(pid);
            res.status(200).send({ message: 'Producto eliminado', result });
        } catch (error) {
            logger.error(error);
        }
    };

    uploadProductThumbnail = async (req, res, next) => {
        try {
            const { pid } = req.params;
            uploader.array('thumbnail')(req, res, async (error) => {
                if (error) {
                    logger.error(error);
                    return res.status(500).send({ message: 'Error al subir los archivos' });
                }
                const files = req.files;
                const staticBasePath = path.join(__dirname, 'public');
                const thumbnails = files.map(file => {
                    const relativePath = file.path.replace(staticBasePath, '');
                    return '/static' + relativePath;
                });
                const product = await productService.getItemById(pid);
                if (!product) {
                    return res.status(404).send({ message: 'Producto no encontrado' });
                }
                product.thumbnail = thumbnails;
                await product.save();
                res.status(200).send({ message: 'Imagen subida exitosamente', product });
            });
        } catch (error) {
            logger.error(error);
            next(error);
        }
    };

    getProductThumbnail = async (req, res) => {
        try {
            const { pid } = req.params;
            const product = await productService.getItemById(pid);
            if (!product) {
                return res.status(404).send({ message: 'Producto no encontrado' });
            }
            res.status(200).send({ thumbnails: product.thumbnail });
        } catch (error) {
            logger.error(error);
            res.status(500).send({ message: 'Error al obtener las imagenes del producto' });
        }
    };

    showUploadDocumentsView = async (req, res) => {
        const { pid } = req.params;
        try {
            const product = await productService.getItemById(pid);
            if (!product) {
                return res.status(404).send('Producto no encontrado');
            }
            const productDto = new ProductDto(product);
            res.render('uploadProductThumbnail', {
                productId: pid,
                productTitle: productDto.title
            });
        } catch (error) {
            logger.error(error);
        }
    };    
};

module.exports = ProductController;