const { Schema, model } = require("mongoose")

const collection = 'carts'

const CartSchema = new Schema({  
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: Number
    }]
})

CartSchema.pre('find', function(){
    this.populate('products.product')
})

const cartsModel = model(collection,CartSchema)

module.exports = {
    cartsModel
}