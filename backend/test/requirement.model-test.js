const expect  = require('chai').expect;
const error = require('mongoose').Error;
const { Schema } = require('mongoose');
const Requirement =  require('../models/requirement.model');

describe('Requirement Model', function(){
    it('should be invalid if required field is empty', function(done){
        const testReq = new Requirement({});
        testReq.validate(function(err){
                expect(err.errors.name).to.exist
                expect(err.errors.creator).to.exist
                expect(err.errors.isDeleted).to.exist
                expect(err.errors.currentVersion).to.exist
                expect(err.errors.isBeingEdited).to.exist
                expect(err.errors.isChanged).to.exist
                done();
        });
    });
    
})