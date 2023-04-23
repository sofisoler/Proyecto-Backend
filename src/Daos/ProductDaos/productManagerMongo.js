const { productsModel } = require("../../models/products.model")

class ProductManagerMongo {
    getProducts = async ({ page, limit, query='' }) =>  {
        const resp = await productsModel.paginate({}, {limit, page, lean:true })
        return resp
    }

    getProductsById = async (pid) => {
        return await productsModel.findById({_id: pid});
    }
    
    addProduct = async (newItem) => {
        return await productsModel.create(newItem)
    }

    updateProduct = async (pid, productToReplace) => {
        return await productsModel.updateOne({_id: pid}, productToReplace)
    }

    deleteProduct = async (pid) => {
        return await productsModel.deleteOne({_id: pid})
    }
}

module.exports = { ProductManagerMongo }