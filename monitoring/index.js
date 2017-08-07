const Prometheus = require('prom-client')

module.exports = {
  httpRequestDurationMicroseconds: new Prometheus.Histogram({
    name: 'http_request_duration_microseconds',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]  // buckets for response time from 0.1ms to 500ms
  })
}
