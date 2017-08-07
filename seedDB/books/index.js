const fs = require('fs')
const Book = require('../../models/book')

module.exports = function() {
  return new Promise(function(resolve, reject) {
    console.log('books seed started');
    const booksArray = []
    fs.readFile(`${__dirname}/books.json`, (err, data) => {
      console.log('fs.readFile books');
      if (err) {
        console.error('readFile failure', err);
        return reject(err)
      }

      const json = JSON.parse(data.toString())
      json.books.forEach(book => booksArray.push(new Book({ title: book.title, author: book.author, genre: book.genre, read: book.read })))

      return Book.create(booksArray, function(err) {
        if (err) {
          console.error('create failure', err);
          return reject(err)
        }
        console.log('create book success');
        return resolve(true)

      })
    })
  });
}
