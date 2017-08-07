const mongoose = require('mongoose')
mongoose.Promise = global.Promise

module.exports = (function() {
  console.log(mongoose.connection, 'mongoose.connection');
  // if (mongoose.connection.getCollectionNames().length === 0) {
  //   require('../seedDB')
  // }
}())
