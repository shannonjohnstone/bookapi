const Book = require('../models/book');

// middleware used on all routes that have a `bookId`, finds the book and attaches it to req.body
// ------------------------------------------------------------------------------------------------
const bookMiddleware = function(req, res, next) {
  Book.findById(req.params.bookId, function(err, book) {
    if (err) return res.status(500).send(err)
    else if (book) {
      req.book = book
      return next()
    }
    return res.status(404).send('No book found')
  })
}

// get single book
// ------------------------------------------------------------------------------------------------
const getBook = function(req, res) {
  const returnBook = req.book.toJSON()
  returnBook.links = {}
  const genreLink = `http://${req.headers.host}/services/v1/books/?genre=${returnBook.genre}`
  returnBook.links.filterByThisGenre = genreLink.replace(' ', '%20')
  res.json(returnBook)
}

// post new book, creates a new book
// ------------------------------------------------------------------------------------------------
const postNewBook = function(req, res) {
  const book = new Book(req.body)
  if (!req.body.title) {
    res.status(400).send('Title is required')
  } else {
    book.save()
    res.status(201).send(book)
  }
}

// querys all books unless it finds a query and in that case it will finds books that match the query
// ------------------------------------------------------------------------------------------------
const getAllOrQuery = function(req, res) {
  let query = {}
  if (req.query.genre) query.genre = req.query.genre

  Book.find(query, function(err, books) {
    if (err) return res.status(500).send(err) // send err

    // create self links for each book, making it easier for consumers to see how the api works
    const returnBooks = []
    books.forEach(function(el, i, arr) {
      const newBook = el.toJSON()
      newBook.links = {}
      newBook.links.self = `http://${req.headers.host}/services/v1/books/${newBook._id}`
      returnBooks.push(newBook)
    })
    res.json(returnBooks)
  })
}

// updates all values on the book object
// ------------------------------------------------------------------------------------------------
const updateBook = function(req, res) {
  req.book.title = req.body.title
  req.book.author = req.body.author
  req.book.genre = req.body.genre
  req.book.read = req.body.read
  req.book.save(function(err) {
    if (err) return res.status(500).send(err)
    res.json(req.book)
  })
}

// updates a particular value on the book object
// ------------------------------------------------------------------------------------------------
const patchBook = function(req, res) {
  if (req.body._id) delete req.body._id // delete id so we do not change it in the patch
  for (let p in req.body) {
    req.book[p] = req.body[p]
  }

  req.book.save(function(err) {
    if (err) return res.status(500).send(err)
    res.json(req.book)
  })
}

const removeBook = function(req, res) {
  req.book.remove(function(err) {
    if (err) return res.status(500).send(err)
    res.status(204).send('Removed') // 204 is the code for removed
  })
}

module.exports = {
  getBook,
  updateBook,
  patchBook,
  bookMiddleware,
  postNewBook,
  getAllOrQuery,
  removeBook
}
