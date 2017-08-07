const should = require('should')
const sinon = require('sinon')

describe('Book Controller Tests', () => {
  describe('Post', () => {
    it('should not allow an empty title on a post request', () => {

      const req = { body: { author: 'Fox' } }
      const res = {
        status: sinon.stub().returns({ send: sinon.spy() }), // this is so we can chain call in book.controllers `res.status(400).send('message')`
        send: sinon.spy()
      }

      const bookController = require('../controllers/book.controllers');
      bookController.postNewBook(req, res)

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`)
      res.send.calledWith('Title is required')
    });
    it('should allow successful post request', () => {

      const req = { body: { title: 'test-title', author: 'test-author', genre: 'test-genre', read: false } }
      const res = {
        status: sinon.stub().returns({ send: sinon.spy() }), // this is so we can chain call in book.controllers `res.status(400).send('message')`
        send: sinon.spy()
      }

      const bookController = require('../controllers/book.controllers');
      bookController.postNewBook(req, res)

      res.status.calledWith(201).should.equal(true)
    });
  });
});
