const express = require('express')
const router = express.Router()

const SlideShow = require('../models/SlideShow')

// Route: /api/v1/slideshow
router.get('/', (req, res, next) => {
  return SlideShow.find({})
    .populate('slides')
    .then(slideshows => {
      return res.json(slideshows)
    })
    .catch(err => next(err))
})

// Route: /api/v1/slideshow/:id
router
  .get('/:id', (req, res, next) => {
    const { id } = req.params
    return SlideShow.findById(id)
      .populate('slides')
      .then(slideshow => {
        return res.json(slideshow)
      })
      .catch(err => next(err))
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params
    return SlideShow.findById(id)
      .then(slideshow => {
        if (!slideshow) return next('Slideshow not found')
        return slideshow.remove().then(() => {
          return res.send('success')
        })
      })
      .catch(err => next(err))
  })

module.exports = router
