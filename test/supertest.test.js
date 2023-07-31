const chai = require('chai');
const supertest = require('supertest');

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Test session', () => {
    it('Registrar usuario', async () => {
        const userMock = {
            first_name: 'Sofia', 
            last_name: 'Soler',
            email: 'sofia@gmail.com',
            username: 'sofiasoler',
            password: '123'
        }
        const {_body} = await requester.post('/session/register').send(userMock)
        console.log(_body)
        expect(_body.payload).to.be.ok
    })
});