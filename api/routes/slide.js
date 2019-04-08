const express = require('express')
const router = express.Router()
const formidable = require('formidable')

const Slide = require('../models/Slide')
const Slideshow = require('../models/Slideshow')
/**
 * Implimentaiton notes:
 * Should get(/) really return all fields of all slides
 *
 */
// Route: /api/v1/slide
router
  .get('/', (req, res, next) => {
    return Slide.find({})
      .then(slides => {
        if (!slides) {
          res.sendStatus(500)
          return res.send('NO slides found')
        }
        return res.json(slides)
      })
      .catch(err => next(err))
  })
  .post('/', (req, res, next) => {
    var newSlide = new Slide()
    var slideshowID
    if ('data' in req.body) newSlide.data = req.body.data

    if ('type' in req.body) newSlide.type = req.body.type

    if ('title' in req.body) newSlide.title = req.body.title

    if ('description' in req.body) newSlide.description = req.body.description

    if ('duration' in req.body) newSlide.duration = req.body.duration

    if ('slideshowID' in req.body) {
      slideshowID = req.body.slideshowID
      newSlide.slideshow = slideshowID
    } else {
      console.error('Missing SlideShow ID, slide not added')
      return 'Missing SlideSHow ID, slide not added'
    }
    const form = new formidable.IncomingForm()
    form.uploadDir = '../../uploads'
    form.keepExtensions = true
    form.multiples = false
    // Parse the sent data and save it + the path for alex
    return form.parse(req, (err, fields, files) => {
      if (err) {
        res.sendStatus(500)
        res.json({
          result: 'error',
          message: 'Cannot upload file, Error: ${err}'
        })
      } else {
        const filePath = files.data.path
        newSlide.data = filePath
        return addSlideToSlideShow(slideshowID, newSlide, res, next)
      }
    })
    // Checks to make sure the slideShow exists, then adds and saves
  })

// Route: /api/v1/slide/:id
router
  .get('/:id', (req, res, next) => {
    const { id } = req.params
    return Slide.findById(id)
      .populate('slides')
      .then(slide => {
        if (!slide) {
          {
            res.sendStatus(500)
            return res.send('')
          }
        }
        return res.json(slide)
      })
      .catch(err => next(err))
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params
    return Slide.findByIdAndRemove(id)
      .then(slide => {
        if (!slide) {
          res.sendStatus(500)
          return res.send('slide not found')
        }
        return slide
          .remove()
          .then(() => {
            return deleteSlideFromSlideShow(slide, next, res)
          })
          .catch(err => next(err))
      })
      .catch(err => next(err))
  })
  //Given changed fields, save the slide
  .patch('/:id', (req, res, next) => {
    const { id } = req.params
    return Slide.findById(id)
      .then(slide => {
        if (!slide) {
          res.sendStatus(500)
          return res.send('slide not found')
        }
        if ('data' in req.body) slide.data = req.body.data

        if ('type' in req.body) slide.type = req.body.type

        if ('title' in req.body) slide.title = req.body.title

        if ('description' in req.body) slide.description = req.body.description

        if ('duration' in req.body) slide.duration = req.body.duration
        if ('slideShowID' in req.body)
          console.error('Switching slide to a different slideshow currently not implemented')

        return slide
          .save()
          .then(() => {
            res.sendStatus(200)
            return res.send('Field Succesfuly Changed')
          })
          .catch(err => next(err))
      })
      .catch(err => next(err))
  })

module.exports = router

/**
 * This function finds the given slideshow,
 * then it saves the slide and pushes its id to slideshow
 * @param {The ID of target slideshow} slideShowID
 * @param {The slide that is being saved} slide
 * @param {Whatever next is, ask Wasssseeeeeemmm} next
 */
function addSlideToSlideShow(slideShowID, slide, res, next) {
  return Slideshow.findById(slideShowID)
    .then(slideshow => {
      if (!slideshow) {
        res.sendStatus(500)
        return res.send('slideshow not found')
      }
      return slide
        .save()
        .then(slide => {
          if (!slide) {
            res.sendStatus(500)
            return res.send('slide not saved')
          }
          slideshow.slides.push(slide._id).catch(err => next(err))
          return slideshow
            .save()
            .then(slideshow => {
              if (!slideshow) {
                res.sendStatus(500)
                return res.send('slideshow not saved')
              }
              res.sendStatus(200)
              return res.send('Slide added to slideshow')
            })
            .catch(err => next(err))
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
}

function deleteSlideFromSlideShow(slide, next, res) {
  var slideShowID = slide.slideshow
  return Slideshow.findById(slideShowID).then(slideshow => {
    if (!slideshow) {
      res.sendStatus(500)
      return res.send('something went wrong finding slideshow')
    }
    slideshow.slides = slideshow.slides.filter(function(value, index, arr) {
      return value == slide._id
    })
    return slideshow.save().then(slideshow => {
      if (!slideshow) {
        res.sendStatus(500)
        return res.send('something went wrong finding slideshow')
      }
      res.sendStatus(200)
      return res.send('slide deleted from slideshow')
    })
  })
}
