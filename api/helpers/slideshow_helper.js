const Slide = require('../models/Slide')

function deleteSlides(slides) {
  slides.forEach(slide => {
    Slide.findByIdAndRemove(slide)
  })
}

module.exports = {
  deleteSlides
}
