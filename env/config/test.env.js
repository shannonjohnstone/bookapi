const environment = require('./values').test

process.env.NODE_ENV = 'test'
process.env.MONGO_URI = environment.MONGO_URI
