const { ordersModel } = require("../mongo/models/orders.model");

class OrderManagerMongo {

    // Obtener todas las órdenes
    get = async ({}) =>  {
        return await ordersModel.find({});
    };

    // Obtener una orden por su ID
    getById = async (oid) =>  {
        return await ordersModel.findOne({ _id: oid });
    };

    // Crear una nueva orden en la base de datos
    create = async (newOrder) =>  {
        return await ordersModel.create(newOrder);
    };

    // Actualizar una orden por su ID
    update = async (oid, orderToUpdate) =>  {
        return await ordersModel.updateOne({ _id: oid }, orderToUpdate);
    };

    // Eliminar una orden por su ID
    delete = async (oid) =>  {
        return await ordersModel.deleteOne({ _id: oid });
    };

    // Obtener órdenes de un usuario por su ID
    getUserOrders = async (uid) => {
        const order = await ordersModel.find({ user: uid });
        return order;
    };
}

module.exports =  OrderManagerMongo;