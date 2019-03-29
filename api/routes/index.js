const express = require('express')
const router = express.Router()

router.use('/slide', require('./slide'))
router.use('/slideshow', require('./slideshow'))

module.exports = router
