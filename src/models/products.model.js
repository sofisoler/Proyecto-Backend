const { Schema, model } = require('mongoose')

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
        type: String,
        required: true
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
})

const productsModel = model(collection , ProductSchema)

module.exports = {
    productsModel
}