const express = require('express')
const router = express.Router()

const Slideshow = require('../models/Slideshow')
const Slide = require('../models/Slide')

// Route: /api/v1/slideshow
router.get('/', (req, res, next) => {
  return Slideshow.find({})
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
    return Slideshow.findById(id)
      .populate('slides')
      .then(slideshow => {
        return res.json(slideshow)
      })
      .catch(err => next(err))
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params
    return Slideshow.findByIdAndDelete(id)
      .then(slideshow => {
        if (!slideshow) return next('Slideshow not found')
        deleteSlides(slideshow.slides)
      })
      .catch(err => next(err))
  }) //Adding new slide, this funciton, not need
  .post('/:id', (req, res, next) => {
    const { id } = req.params
    const { slideID } = req.body
    return Slideshow.findById(id).then(slideshow => {
      slideshow.slides.push(slideID)
      slideshow.save().then()
    })
  }) //For updating: changing slide order, give slide_id and location from 0->n, -1 is end
  .patch('/:id', (req, res, next) => {
    const { id } = req.params
    try {
      var slideID = req.body.slideID
      var index = req.body.index
      return Slideshow.findById(id).then(slideshow => {
        slideshow.slides = slideshow.slides.filter(function(value, index, arr) {
          return value == slideID
        })
        slideshow.slides.splice(index, 0, slideID)
        return 'Removed that slide and repositioned it baby'
      })
    } catch (e) {
      console.error(e)
    }
  })

module.exports = router

function deleteSlides(slides) {
  slides.forEach(slide => {
    Slide.findByIdAndRemove(slide)
  })
}
