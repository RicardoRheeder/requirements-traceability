const expect  = require('chai').expect;
const error = require('mongoose').Error;
const { Schema, Mongoose } = require('mongoose');
const Document =  require('../models/document.model');

describe('Document Model', function(){
    
    it('should be invalid if a required field is empty', function(done){
        const testD = new Document({});
        testD.validate(function(err){
                expect(err.errors.title).to.exist
                expect(err.errors.admin).to.exist
                done();
        });
    });
    
});