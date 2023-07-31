const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const collection = 'products'

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    thumbnail: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    code: {
        type: Number,
        unique: true,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});

ProductSchema.plugin(mongoosePaginate);

const productsModel = model(collection , ProductSchema);

module.exports = {
    productsModel
};