import express from 'express'
import Slideshow from '../models/Slideshow.js'
import SlideshowHelper from '../helpers/slideshow_helper.js'
import CommonHelper from '../helpers/common_helper.js'

const router = express.Router()

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
  .patch('/:id/reorder', async (req, res, next) => {
    const { id } = req.params
    try {
      const { default: arrayMove } = await import('array-move')
      const slideshow = await Slideshow.findById(id)
      
      if (!slideshow) return next(new Error('Slideshow not found'))

      const oldIndex = req.body.oldIndex
      const newIndex = req.body.newIndex
      slideshow.slides = arrayMove(slideshow.slides, oldIndex, newIndex)

      await slideshow.save()
      await CommonHelper.broadcastUpdate(res.io)
      return res.json({ success: true })
    } catch (err) {
      next(err)
    }
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

export default router
