module.exports = function(app) {
  app.use('/services/v1/books', require('./book.routes'))
  app.use('/', require('./root.routes'))
}
