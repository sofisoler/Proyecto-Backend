const { productService } = require("../service");

class ProductController {

    getProducts = async (req, res) => {
        try {
            const mensaje = req.query.mensaje || '';
            const login = req.session.user;
            const { page=1, limit=10 } = req.query
            const { docs, 
                hasPrevPage,
                prevPage,
                hasNextPage,
                nextPage, 
            } = await productService.getItems({page, limit});
            if (!docs) {
                return res.status(400).send('Not Found');
            }
            res.status(200).render('product', {
                mensaje: mensaje,
                user: login,
                products: docs,
                hasPrevPage,
                prevPage,
                hasNextPage,
                nextPage, 
            });
        } catch (error) {
            console.log(error);
        }
    };

    getProduct = async (req, res) => {
        try {
            const { pid } = req.params
            let productById = await productService.getItemById(pid);
            res.send(productById);
        } catch (error) {
            console.log(error);
        }
    };

    createProduct = async (req, res) => {
        try {
            let {title, thumbnail, price, code, stock} = req.body
            if (!title || !thumbnail || !price || !code || !stock) {
                return res.status(400).send({message: 'Corroborar que esten todos los datos'})
            }
            let addedProduct = await productService.createItem({title, description, thumbnail, price, code, stock})
            res.status(201).send({ 
                addedProduct,
                message: 'Product created' 
            })
        } catch (error) {
            console.log(error);
        }
    };

    updateProducts =  async (req, res) => {
        try {
            const { pid } = req.params
            let productToReplace = req.body
            if (!productToReplace.title || !productToReplace.thumbnail || !productToReplace.price || !productToReplace.code || !productToReplace.stock) {
                return res.status(400).send({message: 'Corroborar que esten todos los datos'})
            }
            let result = await productService.updateItem(pid, productToReplace)
            res.status(201).send({ 
                products: result,
                message: 'Modified product'
            })
        } catch (error) {
            console.log(error);
        }
    };

    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params
            let result = await productService.deleteItem(pid)
            res.status(200).send({ message:"Deleted product", result })
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = ProductController