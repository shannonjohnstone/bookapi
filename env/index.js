module.exports = function(NODE_ENV) {
  switch (NODE_ENV) {
    case 'development': {
      return require('./development.env')
    }
    case 'test': {
      return require('./test.env')
    }
    default: {
      return require('./development.env')
    }
  }
}
