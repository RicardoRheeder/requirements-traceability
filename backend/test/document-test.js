process.env.NODE_ENV = 'test';


let mongoose = require('mongoose')
const stub = require('sinon')
let Document = require('../models/document.model');
const User = require('../models/user.model')
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
    

    describe('/documents', () => {
        it('should get all the docs', (done) =>{
            chai.request(server).get('/documents').end((err,res) => {
                res.should.have.status(200);
                res.body.response.should.be.a('array'); 
                res.body.response.should.not.be.empty
                done();
            })
            
        })   
    })
    it('should create a new document', ()=>{
        it('should create a document', (done)=> {
            let tdoc = {
                title: "testdoc",
                admin: "jadynt",
                collaborators: null
            }
            chai.request(server).post('/documents/create-document').send(tdoc).end((err,res) => {
                res.should.have.status(200);
                done();
            }) 
        })
    })
    
})