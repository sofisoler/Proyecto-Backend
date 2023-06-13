const { ordersModel } = require("../mongo/models/orders.model");

class OrderManagerMongo {

    constructor() {
        this.ordersModel = ordersModel
    };

    async get() {
        return await this.ordersModel.find({})
    };

    async getById(oid) {
        return await this.ordersModel.findOne({_id: oid})
    };

    async create(newOrder) {
        console.log('dao',newOrder)
        return await this.ordersModel.create(newOrder)
    };

    async update(oid) {};

    async delete(oid) {};
};

module.exports =  OrderManagerMongo