import Slide from '../models/Slide.js'
import CommonHelper from './common_helper.js'

function deleteSlides(slides, res) {
  return Promise.all(
    slides.map(slide => {
      return Slide.findByIdAndRemove(slide)
    })
  ).then(() => CommonHelper.broadcastUpdate(res.io))
}

export default {
  deleteSlides
}
