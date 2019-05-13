const Slideshow = require('../models/Slideshow')
const CommonHelper = require('./common_helper')

function addSlide(slide, res, next) {
  return Slideshow.findById(slide.slideshow)
    .then(slideshow => {
      if (!slideshow) return next(new Error('Slideshow not saved'))
      return slide.save().then(slide => {
        if (!slide) return next(new Error('Slide not saved'))
        slideshow.slides.push(slide._id)
        return slideshow.save().then(slideshow => {
          if (!slideshow) return next(new Error('Slideshow not saved'))
          return CommonHelper.broadcastUpdate(res.io).then(() => res.json({ success: true }))
        })
      })
    })
    .catch(err => next(err))
}

function deleteSlide(slide, next, res) {
  return Slideshow.findById(slide.slideshow).then(slideshow => {
    if (!slideshow) return next(new Error('Slideshow not found'))
    slideshow.slides = slideshow.slides.filter(function(value) {
      console.log('value', value, 'typeof ', typeof value)
      console.log('slide._id', slide._id, 'typeof ', typeof slide._id)
      console.log('different?', value != slide._id)
      return value != slide._id
    })
    console.log('slideshow.slides after deletion ', slideshow.slides)
    return slideshow
      .save()
      .then(() => CommonHelper.broadcastUpdate(res.io))
      .then(() => {
        return res.json({ success: true })
      })
  })
}

module.exports = {
  deleteSlide,
  addSlide
}
