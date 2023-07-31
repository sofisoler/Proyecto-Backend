const mongoose = require('mongoose');
const Products = require('../src/Daos/mongoDAO/product.mongo');
const Assert = require('assert');

mongoose.connect('mongodb+srv://sofisoler01:sofia123@proyectobackend.clbjxic.mongodb.net/ecommerce?retryWrites=true&w=majority');

const assert = Assert.strict

describe('Testing product dao', () => {
    before(function() {
        this.productDao = new Products()
    })
    beforeEach(function() {
        this.timeout(5000)
    })
    it('Agregar producto a la base de datos', async function() {
        let mockProduct = {
            title: 'Impresora 3D',
            description: '',
            thumbnail: '',
            price: 7000,
            code: 9,
            stock: 50
        }
        const result = await this.productDao.create(mockProduct)
        assert.ok(result._id)
        assert.deepStrictEqual(result.products, [])
    })
});