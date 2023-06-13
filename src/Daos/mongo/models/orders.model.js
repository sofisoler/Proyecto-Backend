const {Schema, model} = require('mongoose')

const orderCollection = 'orders'

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        }
    }],
    total: Number,
    created: Date
});

const ordersModel = model(orderCollection, orderSchema);

module.exports = {
    ordersModel
};