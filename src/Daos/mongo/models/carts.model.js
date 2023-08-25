const { Schema, model } = require("mongoose");

const collection = 'carts';

const CartSchema = new Schema({
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
    }]
});

CartSchema.pre('findOne', function(next) {
    this.populate('products.product');
    next();
});

const cartsModel = model(collection, CartSchema);

module.exports = {
    cartsModel
};