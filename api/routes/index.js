const express = require('express')
const router = express.Router()

router.use('/slide', require('./slide'))
router.use('/slideshow', require('./slideshow'))
router.use('/widgets', require('./widgets'))

module.exports = router
