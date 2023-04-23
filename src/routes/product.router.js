const { Router } = require('express')
const { ProductManagerMongo } = require('../Daos/ProductDaos/productManagerMongo');

const productRouter = Router();

const productsManager = new ProductManagerMongo();

productRouter.get("/", async (req, res) => {
    try {
        const { page=1, limit=3 } = req.query
        const { docs, 
            hasPrevPage,
            prevPage,
            hasNextPage,
            nextPage, 
        } = await productsManager.getProducts({page, limit});
        if (!docs) {
            return res.status(400).send('Not Found');
        }
        res.status(200).render('product', {
            products: docs, 
            hasPrevPage,
            prevPage,
            hasNextPage,
            nextPage, 
        });
    } catch (error) {
        console.log(error);
    }
});

productRouter.get("/:pid", async (req, res) => {
    const { pid } = req.params
    let productById = await productsManager.getProductsById(pid);
    res.send(productById);
});

productRouter.post("/", async (req, res) => {
    try {
        let {title, thumbnail, price, code, stock} = req.body
        if (!title || !thumbnail || !price || !code || !stock) {
            return res.status(400).send({message: 'Corroborar que esten todos los datos'})
        }
        let addedProduct = await productsManager.addProduct({title, description, thumbnail, price, code, stock})
        res.status(201).send({ 
            addedProduct,
            message: 'Product created' 
        })
    } catch (error) {
        console.log(error)
    }
});

productRouter.put('/:pid', async (req, res) =>{
    const { pid } = req.params
    let productToReplace = req.body
    if (!productToReplace.title || !productToReplace.thumbnail || !productToReplace.price || !productToReplace.code || !productToReplace.stock) {
        return res.status(400).send({message: 'Corroborar que esten todos los datos'})
    }
    let result = await productsManager.updateProduct(pid, productToReplace)
    res.status(201).send({ 
        products: result,
        message: 'Modified product'
    })
})

productRouter.delete('/:pid', async (req, res)=> {
    const { pid } = req.params
    let result = await productsManager.deleteProduct(pid)
    res.status(200).send({ message:"Deleted product", result })
})

module.exports = productRouter