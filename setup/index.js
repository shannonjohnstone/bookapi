module.exports = {
  connectMongoose: function() {
    require('./mongoose')
  },
  checkAndSeed: function() {
    require('./checkAndSeed')
  }
}
