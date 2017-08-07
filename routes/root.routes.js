const express = require('express');

const router = express.Router()

const allOtherRoutes = function(req, res) {
  res.status(200).send('Book Api - Docker container')
}

const rootRoute = function(req, res) {
  res.send('This is the api base')
}

router.get('/api', rootRoute)
router.get('/', allOtherRoutes)

module.exports = router;
