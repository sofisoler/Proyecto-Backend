const mongoose = require('mongoose');
const Carts = require('../src/Daos/mongoDAO/cart.mongo');
const chai = require('chai');

mongoose.connect('mongodb+srv://sofisoler01:sofia123@proyectobackend.clbjxic.mongodb.net/ecommerce?retryWrites=true&w=majority');

const expect = chai.expect;

describe('Testing de Chai', function () {
    before(function () {
        this.cartDao = new Carts();
    });

    beforeEach(function () {
        this.timeout(5000);
    });
    
    it('Obtener carritos en formato de arreglo', async function () {
        let result = await this.cartDao.get({});
        console.log(result);
        expect(result).to.be.deep.equal([]);
    });
});