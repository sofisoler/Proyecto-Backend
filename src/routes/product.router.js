const { Router } = require('express')
const { ProductManagerMongo } = require('../Daos/ProductDaos/productManagerMongo');

const productRouter = Router();

const productsManager = new ProductManagerMongo();

productRouter.get("/", async (req, res) => {
    try {
        const products = await productsManager.getProducts();
        if (!products) {
            return res.status(400).send('Not Found');
        }
        res.status(200).send(products);
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
    let result = await productsManager.updateUser(pid, productToReplace)
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

// productsManager.addProduct({title: "Product1", description: "Description1", thumbnail: "Image1", price: "2000", code: "0001", stock: "50"})
// productsManager.addProduct({title: "Product2", description: "Description2", thumbnail: "Image2", price: "8000", code: "0002", stock: "50"})
// productsManager.addProduct({title: "Product3", description: "Description3", thumbnail: "Image3", price: "6000", code: "0003", stock: "50"})