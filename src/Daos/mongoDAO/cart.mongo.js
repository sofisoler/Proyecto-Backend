const { cartsModel } = require("../mongo/models/carts.model");

class CartManagerMongo {
    
    // Obtener todos los carritos
    get = async ({}) =>  {
        return await cartsModel.find({});
    };

    // Obtener un carrito por su ID
    getById = async (cid) => {
        return await cartsModel.findById({ _id: cid });
    };
    
    // Crear un nuevo carrito
    create = async () => {
        return await cartsModel.create({ products: [] });
    };

    // Agregar un producto a un carrito por los IDs de carrito y producto
    update = async (cid, pid) => {
        let cart = await cartsModel.findById({ _id: cid });
        cart.products.push({ product: pid });
        return await cartsModel.findByIdAndUpdate({ _id: cid }, cart);
    };

    // Eliminar un producto de un carrito por los IDs de carrito y producto
    delete = async (cid, pid) => {
        let cart = await cartsModel.findById({ _id: cid });
        cart.products.pull({ product: pid });
        return await cart.save();
    };

    // Eliminar todos los productos de un carrito por su ID
    deleteItems = async (cid) => {
        return await cartsModel.updateOne({ _id: cid }, { products: [] });
    };

    // Obtener el carrito de un usuario por su ID
    getCartByUser = async (uid) => {
        const cart = await cartsModel.findOne({ user: uid });
        return cart;
    };

    // Crear un carrito nuevo para un usuario
    createCartForUser  = async (uid) => {
        const newCart = new cartsModel(); 
        newCart.user = uid;
        await newCart.save();
        return newCart;
    };
};

module.exports = CartManagerMongo;