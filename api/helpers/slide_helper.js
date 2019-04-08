const Slideshow = require('../models/Slideshow')

function addSlide(slide, res, next) {
  return Slideshow.findById(slide.slideshow)
    .then(slideshow => {
      if (!slideshow) return next(new Error('Slideshow not saved'))
      return slide.save().then(slide => {
        if (!slide) return next(new Error('Slide not saved'))
        slideshow.slides.push(slide._id).catch(err => next(err))
        return slideshow.save().then(slideshow => {
          if (!slideshow) return next(new Error('Slideshow not saved'))
          return res.json({ success: true })
        })
      })
    })
    .catch(err => next(err))
}

function deleteSlide(slide, next, res) {
  return Slideshow.findById(slide.slideshow).then(slideshow => {
    if (!slideshow) return next(new Error('Slideshow not found'))
    slideshow.slides = slideshow.slides.filter(function(value) {
      return value != slide._id
    })
    return slideshow.save().then(() => {
      return res.json({ success: true })
    })
  })
}

module.exports = {
  deleteSlide,
  addSlide
}
