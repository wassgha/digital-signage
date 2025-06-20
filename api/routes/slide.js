import express from 'express'
import multer from 'multer'
import path from 'path'
import CommonHelper from '../helpers/common_helper.js'
import Slide from '../models/Slide.js'
import SlideHelper from '../helpers/slide_helper.js'

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

// Route: /api/v1/slide
router
  .get('/', (req, res, next) => {
    return Slide.find({})
      .then(slides => {
        if (!slides) {
          res.sendStatus(500)
          return res.send('No slides found')
        }
        return res.json(slides)
      })
      .catch(err => next(err))
  })
  .post('/', upload.single('data'), (req, res, next) => {
    if (req.body.slideshow == undefined)
      return next(new Error('Missing Slideshow ID, slide not added'))

    // Either the uploaded file if found or the text data field
    const data = req.file && req.file.path ? '/' + req.file.path : req.body.data

    const newSlide = new Slide({
      data: data,
      type: req.body.type,
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      slideshow: req.body.slideshow
    })

    return SlideHelper.addSlide(newSlide, res, next)
  })

// Route: /api/v1/slide/standalone_upload
router.post('/standalone_upload', upload.single('data'), (req, res, next) => {
  if (!req.file || !req.file.path) return next(new Error('Missing file upload'))

  return res.json({ success: true, url: '/' + req.file.path })
})

// Route: /api/v1/slide/:id
router
  .get('/:id', (req, res, next) => {
    const { id } = req.params
    return Slide.findById(id)
      .then(slide => {
        if (!slide) return next(new Error('Slide not found'))
        return res.json(slide)
      })
      .catch(err => next(err))
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params
    return Slide.findByIdAndRemove(id)
      .then(slide => {
        if (!slide) return next(new Error('Slide not found'))
        return SlideHelper.deleteSlide(slide, next, res)
      })
      .catch(err => next(err))
  })
  .patch('/:id', upload.single('data'), (req, res, next) => {
    const { id } = req.params
    return Slide.findById(id)
      .then(slide => {
        if (!slide) return next(new Error('Slide not found'))

        // Either the uploaded file if found or the text data field
        const data = req.file && req.file.path ? '/' + req.file.path : req.body.data

        if (data != null && typeof data !== 'undefined') slide.data = data
        if ('type' in req.body) slide.type = req.body.type
        if ('title' in req.body) slide.title = req.body.title
        if ('description' in req.body) slide.description = req.body.description
        if ('duration' in req.body) slide.duration = req.body.duration

        return slide
          .save()
          .then(() => CommonHelper.broadcastUpdate(res.io))
          .then(() => {
            return res.json({ success: true })
          })
      })
      .catch(err => next(err))
  })

export default router
