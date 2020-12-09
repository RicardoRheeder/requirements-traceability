let mongoose = require('mongoose')
const stub = require('sinon')
let Document = require('../models/document.model');
let User = require('../models/user.model')
let chai = require('chai');
let chaiHttp = require('chai-http');
const routes = require('../routes/document')
const document = require('../models/document.model')
let server = require('../server');
const { connection, Schema } = require('mongoose');
const { test } = require('mocha');
let should = chai.should();
let id = require('mongoose').Types.ObjectId();
chai.use(chaiHttp);

describe('document routes', function() {
    

    describe('/users', () =>{
        it('should get all the users', (done)=> {
            chai.request(server).get('/users').end((err,res) => {
                res.should.have.status(200);
                res.body.response.should.be.a('array'); 
                res.body.response.should.not.be.empty
                done();
            })
        })
        it('should create a user', (done)=> {
            let tuser = {
                username: "jadyny",
                email: "jadyn2004@live.ca"
            }
            chai.request(server).post('/users/create-user').send(tuser).end((err,res) => {
                res.should.have.status(400);
                done();
            }) 
        })
    })
})
