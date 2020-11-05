const expect  = require('chai').expect;
const error = require('mongoose').Error;
const { Schema, Mongoose } = require('mongoose');
const User =  require('../models/user.model');

describe('User Model', function(){
    it('should be invalid if a required field is empty', function(done){
        const testUser = new User({});
        testUser.validate(function(err){
                expect(err.errors.username).to.exist
                expect(err.errors.email).to.exist
                done();
        });
    });
})