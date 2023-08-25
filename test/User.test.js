const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Users = require('../src/Daos/mongoDAO/user.mongo');
const Assert = require('assert');

mongoose.connect('mongodb+srv://sofisoler01:sofia123@proyectobackend.clbjxic.mongodb.net/ecommerce?retryWrites=true&w=majority');

const assert = Assert.strict;

describe('Testing user dao', function() {
    before(function() {
        this.userDao = new Users();
    });
    
    beforeEach(function() {
        this.timeout(5000);
    });
    
    it('Agregar usuario a la base de datos', async function() {
        let mockUser = {
            full_name: 'John Smith',
            first_name: 'John', 
            last_name: 'Smith',
            email: 'john.smith@hotmail.com',
            username: 'johnsmith',
            password: 'john123'
        };
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(mockUser.password, saltRounds);
        mockUser.password = hashedPassword;

        const result = await this.userDao.create(mockUser);
        assert.ok(result._id);
        assert.deepStrictEqual(result.users, []);
    });
    
    it('Eliminar usuario de la base de datos', async function() {
        let mockUser = {
            _id: '64e93cf65e586e7f588de73b'
        };
        await this.userDao.delete(mockUser._id);
    });
});