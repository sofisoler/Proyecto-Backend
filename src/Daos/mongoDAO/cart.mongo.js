const { cartsModel } = require("../mongo/models/carts.model");

class CartManagerMongo {
    
    get = async ({}) =>  {
        return await cartsModel.find({})
    };

    getById = async (cid) => {
        return await cartsModel.findById({_id: cid});
    };
    
    create = async () => {
        return await cartsModel.create({products: []});
    };

    update = async (cid, pid) => {
        let cart = await cartsModel.findById({_id: cid})
        cart.products.push({product: pid})
        return await cartsModel.findByIdAndUpdate({_id: cid}, cart)
    };

    delete = async (cid, pid) => {
        let cart = await cartsModel.findById({_id: cid})
        cart.products.pull({product: pid})
        return await cart.save();
    };

    deleteItems = async (cid) => {
        return await cartsModel.updateOne({_id: cid}, {products: []})
    };
};

module.exports = CartManagerMongo