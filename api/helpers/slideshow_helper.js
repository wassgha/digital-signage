const Slide = require('../models/Slide')

function deleteSlides(slides) {
  return Promise.all(
    slides.map(slide => {
      return Slide.findByIdAndRemove(slide)
    })
  )
}

module.exports = {
  deleteSlides
}
