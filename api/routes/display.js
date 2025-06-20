import express from 'express'
import Display from '../models/Display.js'
import DisplayHelper from '../helpers/display_helper.js'
import CommonHelper from '../helpers/common_helper.js'

const router = express.Router()

// Route: /api/v1/display
router
  .get('/', (req, res, next) => {
    return Display.find({})
      .populate('widgets')
      .then(displays =>
        displays && displays.length > 0
          ? displays
          : DisplayHelper.newDisplay(req).then(() => Display.find({}).populate('widgets'))
      )
      .then(displays => {
        return res.json(displays)
      })
      .catch(err => next(err))
  })
  .post('/', (req, res, next) => {
    return DisplayHelper.newDisplay(req, res, next)
      .then(display => {
        if (!display) {
          next(new Error('Display not created'))
        }
        return CommonHelper.broadcastUpdate(res.io).then(() => res.json(display))
      })
      .catch(err => next(err))
  })

// Route: /api/v1/display/:id
router
  .get('/:id', (req, res, next) => {
    const { id } = req.params
    return Display.findById(id)
      .populate('widgets')
      .then(display => {
        return res.json(display)
      })
      .catch(err => next(err))
  })
  .get('/:id/widgets', (req, res, next) => {
    const { id } = req.params
    return Display.findById(id)
      .populate('widgets')
      .then(display => {
        return res.json(display.widgets)
      })
      .catch(err => next(err))
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params
    return Display.findByIdAndDelete(id)
      .then(display => {
        if (!display) return next('Display not found')
        return DisplayHelper.deleteWidgets(display.widgets, res).then(() => {
          return res.json({ success: true })
        })
      })
      .catch(err => next(err))
  })
  .patch('/:id', (req, res, next) => {
    const { id } = req.params
    return Display.findById(id)
      .then(display => {
        if (!display) return next(new Error('Display not found'))

        if ('name' in req.body) display.name = req.body.name
        if ('layout' in req.body) display.layout = req.body.layout
        if ('statusBar' in req.body) display.statusBar = req.body.statusBar

        return display
          .save()
          .then(() => CommonHelper.broadcastUpdate(res.io))
          .then(() => {
            return res.json({ success: true })
          })
      })
      .catch(err => next(err))
  })

export default router
