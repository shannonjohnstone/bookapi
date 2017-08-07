const mongoose = require('mongoose')
mongoose.Promise = global.Promise

module.exports = (function() {
  mongoose.connection.on('open', function(err, db) {
    console.log('Connect to mongo server');
    require('../seedDB')
  })

  mongoose.connection.on('error', function(err) {
    console.log('Error connecting to mongo server');
  })

  mongoose.connect(process.env.MONGO_URI, {
    useMongoClient: true
  }, (err, db) => {
    if (err) {
      console.error('Please make sure mongodb is installed and running', err)
      throw err
    }
  })
}())

// db.collectionNames(function(err, collections){
//    console.log(collections, 'WE HAVE A CONNECTION....');
// });
