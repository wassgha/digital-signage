const express = require('express')
const router = express.Router()
const arrayMove = require('array-move')

const Slideshow = require('../models/Slideshow')
const SlideshowHelper = require('../helpers/slideshow_helper')
const CommonHelper = require('../helpers/common_helper')

// Route: /api/v1/slideshow
router
  .get('/', (req, res, next) => {
    return Slideshow.find({})
      .populate('slides')
      .then(slideshows => {
        return res.json(slideshows)
      })
      .catch(err => next(err))
  })
  .post('/', (req, res, next) => {
    const newSlideShow = new Slideshow({
      title: req.body.title
    })
    return newSlideShow
      .save()
      .then(slideshow => {
        if (!slideshow) {
          next(new Error('Slideshow not created'))
        }
        return CommonHelper.broadcastUpdate(res.io).then(() => res.json(slideshow))
      })
      .catch(err => next(err))
  })

// Route: /api/v1/slideshow/:id
router
  .get('/:id', (req, res, next) => {
    const { id } = req.params
    return Slideshow.findById(id)
      .populate('slides')
      .then(slideshow => {
        return res.json(slideshow)
      })
      .catch(err => next(err))
  })
  .get('/:id/slides', (req, res, next) => {
    const { id } = req.params
    return Slideshow.findById(id)
      .populate('slides')
      .then(slideshow => {
        return res.json(slideshow.slides)
      })
      .catch(err => next(err))
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params
    return Slideshow.findByIdAndDelete(id)
      .then(slideshow => {
        if (!slideshow) return next('Slideshow not found')
        return SlideshowHelper.deleteSlides(slideshow.slides, res).then(() => {
          return res.json({ success: true })
        })
      })
      .catch(err => next(err))
  })
  .patch('/:id/reorder', (req, res, next) => {
    const { id } = req.params
    return Slideshow.findById(id)
      .then(slideshow => {
        if (!slideshow) return next(new Error('Slideshow not found'))

        const oldIndex = req.body.oldIndex
        const newIndex = req.body.newIndex
        slideshow.slides = arrayMove(slideshow.slides, oldIndex, newIndex)

        return slideshow
          .save()
          .then(() => CommonHelper.broadcastUpdate(res.io))
          .then(() => {
            return res.json({ success: true })
          })
      })
      .catch(err => next(err))
  })
  .patch('/:id', (req, res, next) => {
    const { id } = req.params
    return Slideshow.findById(id)
      .then(slideshow => {
        if (!slideshow) return next(new Error('Slideshow not found'))

        if ('title' in req.body) slideshow.title = req.body.title

        return slideshow
          .save()
          .then(() => CommonHelper.broadcastUpdate(res.io))
          .then(() => {
            return res.json({ success: true })
          })
      })
      .catch(err => next(err))
  })

module.exports = router
