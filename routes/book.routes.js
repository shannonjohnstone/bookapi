const express = require('express');
const bookControllers = require('../controllers/book.controllers')
const Book = require('../models/book');

const router = express.Router()

router.post('/', bookControllers.postNewBook)
router.get('/', bookControllers.getAllOrQuery)
router.use('/:bookId', bookControllers.bookMiddleware)
router.get('/:bookId', bookControllers.getBook)
router.put('/:bookId', bookControllers.updateBook)
router.patch('/:bookId', bookControllers.patchBook)
router.delete('/:bookId', bookControllers.removeBook)

module.exports = router;
