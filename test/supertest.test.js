const chai = require('chai');
const supertest = require('supertest');

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing session', function() {
    it('Registrar usuario', async function() {
        const userMock = {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: ''
        };
        const { body } = await requester.post('/session/register').send(userMock);
        console.log(body);
        expect(body.payload).to.be.ok;
    });
});