const mongoose = require('mongoose')
const seedBooks = require('./books');

mongoose.Promise = global.Promise

require('../env')(process.env.NODE_ENV)

function seed() {
  Promise.all([
    seedBooks()
  ]).then(values => {
    console.log('All seeds completed')
  }).catch(err => {
    console.error('Error with one or more seeds, attempting to reverting seed function', err);
    mongoose.connection.dropDatabase().then((err) => {
      if (err) {
        console.error('Error reverting seed', err);
        throw err
      }
      console.error('Success reverting seed');
      throw err
    })
  })
}

module.exports = (function() {
  mongoose.connect(process.env.MONGO_URI, {
    useMongoClient: true
  }, (err, db) => {
    if (err) {
      console.error('Please make sure mongodb is installed and running', err)
      throw err
    }

    mongoose.connection.db.listCollections().toArray(function(err, names) {
      if (names.length === 0) return seed()
      console.log('Database already exists, no seeding needed');
    })
  })
}())
