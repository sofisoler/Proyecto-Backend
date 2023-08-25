const mongoose = require('mongoose');
const Products = require('../src/Daos/mongoDAO/product.mongo');
const Assert = require('assert');

mongoose.connect('mongodb+srv://sofisoler01:sofia123@proyectobackend.clbjxic.mongodb.net/ecommerce?retryWrites=true&w=majority');

const assert = Assert.strict;

describe('Testing product dao', function() {
    before(function() {
        this.productDao = new Products();
    });

    beforeEach(function() {
        this.timeout(5000);
    });
    
    it('Agregar producto a la base de datos', async function() {
        let mockProduct = {
            title: 'MacBook Pro 13" M2 256 GB',
            description: '',
            thumbnail: ['/static/uploads/thumbnails/thumbnail0.jpeg'],
            price: 1837999,
            code: 0,
            stock: 50
        };
        const result = await this.productDao.create(mockProduct);
        assert.ok(result._id);
        assert.deepStrictEqual(result.products, []);
    });

    it('Eliminar producto de la base de datos', async function() {
        let mockProduct = {
            _id: '64e5344c83e3a28e3f02c4bc'
        };
        await this.productDao.delete(mockProduct._id);
    });
});