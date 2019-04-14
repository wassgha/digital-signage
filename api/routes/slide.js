const express = require('express')
const router = express.Router()
const formidable = require('formidable')

const Slide = require('../models/Slide')
const SlideHelper = require('../helpers/slide_helper')

// Route: /api/v1/slide
router
  .get('/', (req, res, next) => {
    return Slide.find({})
      .then(slides => {
        if (!slides) {
          res.sendStatus(500)
          return res.send('NO slides found')
        }
        return res.json(slides)
      })
      .catch(err => next(err))
  })
  .post('/', (req, res, next) => {
    if (req.body.slideshow == undefined)
      return next(new Error('Missing Slideshow ID, slide not added'))

    const newSlide = new Slide({
      data: req.body.data,
      type: req.body.type,
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      slideshow: req.body.slideshow,
      order: req.body.order
    })

    const form = new formidable.IncomingForm()
    form.uploadDir = '../../uploads'
    form.keepExtensions = true
    form.multiples = false

    return form.parse(req, (err, fields, files) => {
      if (err) {
        return next(new Error('Cannot upload file, Error: ${err}'))
      }
      newSlide.data = files.data.path
      return SlideHelper.addSlide(newSlide, res, next)
    })
  })

// Route: /api/v1/slide/:id
router
  .get('/:id', (req, res, next) => {
    const { id } = req.params
    return Slide.findById(id)
      .then(slide => {
        if (!slide) return next(new Error('Slide not found'))
        return res.json(slide)
      })
      .catch(err => next(err))
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params
    return Slide.findByIdAndRemove(id)
      .then(slide => {
        if (!slide) return next(new Error('Slide not found'))
        return SlideHelper.deleteSlide(slide, next, res)
      })
      .catch(err => next(err))
  })
  .patch('/:id', (req, res, next) => {
    const { id } = req.params
    return Slide.findById(id)
      .then(slide => {
        if (!slide) return next(new Error('Slide not found'))

        if ('data' in req.body) slide.data = req.body.data
        if ('type' in req.body) slide.type = req.body.type
        if ('title' in req.body) slide.title = req.body.title
        if ('description' in req.body) slide.description = req.body.description
        if ('duration' in req.body) slide.duration = req.body.duration

        return slide.save().then(() => {
          return res.json({ success: true })
        })
      })
      .catch(err => next(err))
  })

module.exports = router
