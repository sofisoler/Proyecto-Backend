const { cartsModel } = require("../mongo/models/carts.model");

class CartManagerMongo {
    
    getCarts = async () =>  {
        return await cartsModel.find({})
    };

    getCartById = async (cid) => {
        return await cartsModel.findById({_id: cid});
    };
    
    createCart = async () => {
        return await cartsModel.create({products: []})
    };

    addProductInCart = async (cid, pid) => {
        let cart = await cartsModel.findById({_id: cid})
        cart.products.push({product: pid})
        return await cartsModel.findByIdAndUpdate({_id: cid}, cart)
    };

    deleteProduct = async (cid, pid) => {
        let cart = await cartsModel.findById({_id: cid})
        cart.products.pull({product: pid})
        return await cart.save();
    };

    deleteProducts = async (cid) => {
        return await cartsModel.updateOne({_id: cid}, {products: []})
    };
};

module.exports = CartManagerMongo