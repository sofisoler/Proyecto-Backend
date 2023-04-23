const { cartsModel } = require("../../models/carts.model");

class CartManagerMongo {
    
    getCarts = async () =>  {
        return await cartsModel.find({})
    }

    getCartById = async (cid) => {
        return await cartsModel.findById({_id: cid});
    }
    
    createCart = async () => {
        await cartsModel.create({products: []})
    }

    addProductInCart = async (cid, pid) => {
        let cart = await cartsModel.findById({_id: cid})
        cart.products.push({product: pid})
        return await cartsModel.findByIdAndUpdate({_id: cid}, cart)
    }
}

module.exports = { CartManagerMongo }