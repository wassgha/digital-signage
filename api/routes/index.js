const express = require('express')
const router = express.Router()

router.use('/slide', require('./slide'))
router.use('/slideshow', require('./slideshow'))
router.use('/display', require('./display'))
router.use('/user', require('./user'))
router.use('/widgets', require('./widgets'))

module.exports = router
