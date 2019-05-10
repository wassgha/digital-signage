const Slide = require('../models/Slide')
const CommonHelper = require('./common_helper')

function deleteSlides(slides, res) {
  return Promise.all(
    slides.map(slide => {
      return Slide.findByIdAndRemove(slide)
    })
  ).then(() => CommonHelper.broadcastUpdate(res.io))
}

module.exports = {
  deleteSlides
}
