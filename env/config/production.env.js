const environment = require('./values').production

process.env.NODE_ENV = 'production'
process.env.MONGO_URI = environment.MONGO_URI
