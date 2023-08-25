const mongoose = require('mongoose');
const Orders = require('../src/Daos/mongoDAO/order.mongo');
const Assert = require('assert');

mongoose.connect('mongodb+srv://sofisoler01:sofia123@proyectobackend.clbjxic.mongodb.net/ecommerce?retryWrites=true&w=majority');

const assert = Assert.strict;

describe('Testing order dao', function() {
    let userDao;

    before(function() {
        userDao = new Orders();
    });

    beforeEach(function() {
        this.timeout(5000);
    });

    it('Eliminar documentos de la colección orders', async function() {
        try {
            await mongoose.connection.collections.orders.drop();
        } catch (error) {
            console.error('Error al eliminar documentos de la colección orders:', error);
            assert.fail(error);
        }
    });
});