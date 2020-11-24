process.env.NODE_ENV = 'test';

const stub = require('sinon')
let Document = require('../models/document.model');
let chai = require('chai');
let chaiHttp = require('chai-http');
const routes = require('../routes/document')
const document = require('../models/document.model')
let server = require('../server');
const { connection } = require('mongoose');
let should = chai.should();

chai.use(chaiHttp);

describe('document routes', function() {
    beforeEach((done) => {
        Document.remove({}, (err) => {
            console.log(err);
           
        });
        done();
    });

    describe('/', () => {
        it('should get all the docs', (done) =>{
            chai.request(server).get('/').end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.empty;
                res.body.should.be.a('object');
                
            })
            done();
        })
        
    })
    
})