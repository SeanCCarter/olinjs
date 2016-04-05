// Setup our assertion library
var expect = require('chai').expect;
var request = require('supertest');

var index = require('../../routes/index');
var app = require('./../../app.js')


describe("The app", function() {
  //I thought that this was reasonable to expect
  it('should return something on GET /', function(done) {
    request(app)
      .get('/', function(err, doc){
        should.exist(doc)
      }).expect(200, done);
  });

  it('should return 200 OK on GET /order', function(done) {
    request(app)
      .get('/order')
      .expect(200, done);

  });

  it('should return 200 OK on GET /ingredients', function(done) {
    request(app)
      .get('/ingredients')
      .expect(200, done);
  });

  it('should return 200 OK on GET /kitchen', function(done) {
    request(app)
      .get('/kitchen')
      .expect(200, done);
  });

  it('should return 404 on a route that doesn\'t exist', function(done){
    request(app)
      .get("/twoter")
      .expect(404, done);
  })

});



