const Slide = require('../models/Slide')
const CommonHelper = require('./common_helper')

function deleteSlides(slides) {
  return Promise.all(
    slides.map(slide => {
      return Slide.findByIdAndRemove(slide)
    })
  ).then(CommonHelper.broadcastUpdate)
}

module.exports = {
  deleteSlides
}
