const should = require('should')
const request = require('supertest')
const mongoose = require('mongoose');

// const Book = mongoose.model('Book')
const Book = require('../models/book')
const app = require('../index.js')
const agent = request.agent(app)

describe('Book Crud Test', () => {
  it('should allow a book to be posted and return a read and _id', (done) => {
    const bookPost = { title: 'test-title', author: 'test-author', genre: 'test-genre' }
    agent.post('/services/v1/books')
      .send(bookPost)
      .end(function(err, results) {
        results.body.read === false
        results.body.should.have.property('_id')
        done()
      })
  });
  afterEach(function(done) {
    Book.remove().exec()
    done()
  })
});
