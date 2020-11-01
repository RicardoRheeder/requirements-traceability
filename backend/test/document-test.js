const expect  = require('chai').expect;
const stub = require('sinon')
const routes = require('../routes/document')
const document = require('../models/document.model')

describe('document routes', function() {
    // beforeEach(function(){
    //     sinon.stub(document, 'find');
    // });
    // afterEach(function(){
    //     document.find.restore();
    // })
    // it('gets all documents',function(done){
    //     var a = { name: 'testa' };
    //     var b = { name: 'testb '};
    //     var testModels = [a,b];
    //     document.find.yields(null, testModels);
    //     var req = {params: {} };
    //     var res = {
    //         send:sinon.stub()
    //     };
    //     routes.get('/')
    // })
})