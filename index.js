const express = require('express')
const bodyParser = require('body-parser')
const Prometheus = require('prom-client')
const setup = require('./setup');
// const promMonitoring = require('./monitoring');


require('./env')(process.env.NODE_ENV)

const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: 'http_request_duration_microseconds',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]  // buckets for response time from 0.1ms to 500ms
})

setup.connectMongoose()
// setup.checkAndSeed()

const app = express()

const port = process.env.PORT || 3001

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  next()
})

// bodyParser will look at request for any json objeects and if it finds some it will add it to req.body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.locals.startEpoch = Date.now()
  next()
})

app.get('/metrics', (req, res) => {
  res.set('Content-Type', Prometheus.register.contentType)
  res.end(Prometheus.register.metrics())
})

require('./routes')(app)

// app.use((req, res, next) => {
//   const responseTimeInMs = Date.now() - res.locals.startEpoch
//   console.log(responseTimeInMs, 'responseTimeInMs');
//
//   httpRequestDurationMicroseconds
//     .labels(req.method, req.route.path, res.statusCode)
//     .observe(responseTimeInMs)
//
//   next()
// })

app.listen(port, function() {
  console.log(`api running on http://localhost:${port}`)
})

module.exports = app
