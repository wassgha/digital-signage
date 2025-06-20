import express from 'express'
import Widget from '../models/Widget.js'
import CommonHelper from '../helpers/common_helper.js'
import WidgetHelper from '../helpers/widget_helper.js'

const router = express.Router()

/**
 *  list    - GET /widgets/
 *  create  - POST /widgets/
 *  read    - GET /widgets/{id}/
 *  update  - PUT /widgets/{id}/
 *  delete  - DELETE /widgets/{id}/
 */

// List all widgets - GET /widgets/
router.get('/', (req, res, next) => {
  Widget.find({})
    .then(widgets => res.json(widgets))
    .catch(err => next(err))
})

// Create widget - POST /widgets/
router.post('/', (req, res, next) => {
  const widget = new Widget(req.body)
  widget.save()
    .then(savedWidget => {
      return WidgetHelper.addWidget(req, res, () => {
        return CommonHelper.broadcastUpdateMiddleware(req, res, () => {
          res.json(savedWidget)
        })
      })
    })
    .catch(err => next(err))
})

// Get single widget - GET /widgets/{id}/
router.get('/:id', (req, res, next) => {
  Widget.findById(req.params.id)
    .then(widget => {
      if (!widget) return res.status(404).json({ error: 'Widget not found' })
      res.json(widget)
    })
    .catch(err => next(err))
})

// Update widget - PUT /widgets/{id}/
router.put('/:id', (req, res, next) => {
  Widget.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(widget => {
      if (!widget) return res.status(404).json({ error: 'Widget not found' })
      return CommonHelper.broadcastUpdateMiddleware(req, res, () => {
        res.json(widget)
      })
    })
    .catch(err => next(err))
})

// Delete widget - DELETE /widgets/{id}/
router.delete('/:id', (req, res, next) => {
  Widget.findByIdAndDelete(req.params.id)
    .then(widget => {
      if (!widget) return res.status(404).json({ error: 'Widget not found' })
      return WidgetHelper.deleteWidget(req, res, () => {
        return CommonHelper.broadcastUpdateMiddleware(req, res, () => {
          res.json({ success: true })
        })
      })
    })
    .catch(err => next(err))
})

export default router
