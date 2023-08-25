const { Schema, model } = require("mongoose");

const collection = 'orders';

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    total: Number,
    created: Date
});

const ordersModel = model(collection, OrderSchema);

module.exports = {
    ordersModel
};