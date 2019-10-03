'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('./app');
const should = chai.should();
chai.use(chaiHTTP);

describe('test', () => {
    it('first test', (done) => {
        chai.request(server)
        .post('/api/v1/create-customer')
        .send({
            firstName: 'Gabon',
            lastName: 'Latoz',
            address: {
                street: 'Jl. Gabon no.222 rt.02 rw.14',
                district: 'Arcamanik',
                village: 'Cisaranten Bina Harapan',
                zone: 'Wilayah 1',
                path: 'Gang 1'
            },
            phone: '082119030614'
        })
        .end((err, res) => {
            res.should.have.status(201)
            res.body.success.should.equal(true)
            done()
        })
    });
});