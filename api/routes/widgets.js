const express = require('express')
const router = express.Router()
const mongooseCrudify = require('mongoose-crudify')

const Widget = require('../models/Widget')

/**
 *  list    - GET /widgets/
 *  create  - POST /widgets/
 *  read    - GET /widgets/{id}/
 *  update  - PUT /widgets/{id}/
 *  delete  - DELETE /widgets/{id}/
 */
router.use(
  '/',
  mongooseCrudify({
    Model: Widget
  })
)

module.exports = router
