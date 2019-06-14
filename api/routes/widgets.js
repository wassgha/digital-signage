const express = require('express')
const router = express.Router()
const mongooseCrudify = require('mongoose-crudify')

const Widget = require('../models/Widget')
const CommonHelper = require('../helpers/common_helper')
const WidgetHelper = require('../helpers/widget_helper')

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
    Model: Widget,
    afterActions: [
      {
        middlewares: [CommonHelper.broadcastUpdateMiddleware],
        only: ['update']
      },
      {
        middlewares: [WidgetHelper.addWidget, CommonHelper.broadcastUpdateMiddleware],
        only: ['create']
      },
      {
        middlewares: [WidgetHelper.deleteWidget, CommonHelper.broadcastUpdateMiddleware],
        only: ['delete']
      }
    ]
  })
)

module.exports = router
