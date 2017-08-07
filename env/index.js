module.exports = function(NODE_ENV) {
  switch (NODE_ENV) {
    case 'production': {
      return require('./config/production.env')
    }
    case 'development': {
      return require('./config/development.env')
    }
    case 'test': {
      return require('./config/test.env')
    }
    default: {
      return require('./config/development.env')
    }
  }
}
