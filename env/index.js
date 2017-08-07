module.exports = function(NODE_ENV) {
  switch (NODE_ENV) {
    case 'production': {
      return require('./production.env')
    }
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
