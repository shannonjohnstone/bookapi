const environment = require('./values').development

process.env.NODE_ENV = 'development'
process.env.MONGO_URI = environment.MONGO_URI
