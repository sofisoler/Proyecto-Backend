const { logger } = require("../../utils/logger");
const { ordersModel } = require("../mongo/models/orders.model");

class OrderManagerMongo {

    constructor() {
        this.ordersModel = ordersModel
    };

    async get({}) {
        return await this.ordersModel.find({})
    };

    async getById(oid) {
        return await this.ordersModel.findOne({_id: oid})
    };

    async create(newOrder) {
        logger.info('dao',newOrder)
        return await this.ordersModel.create(newOrder)
    };

    async update(oid, orderToUpdate) {
        return await this.ordersModel.updateOne({_id: oid}, orderToUpdate);
    };

    async delete(oid) {
        return await this.ordersModel.deleteOne({_id: oid});
    };
};

module.exports =  OrderManagerMongo