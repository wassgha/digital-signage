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
        return res.json(slides)
      })
      .catch(err => next(err))
  })
  .post('/', (req, res, next) => {
    try {
      var newSlide = new Slide()
      var slideshowID
      /**
       * Try CATCH error block
       * If front end does not send all data, its okay
       * Only requires a parent slideshow
       * Catches do nothing, as they are left blank
       */
      /*
       * try {
       *   newSlide.data = req.body.data
       * } catch (e) {}
       */
      if (req.body.data) {
        newSlide.data = req.body.data
      }
      if (req.body.type) {
        newSlide.type = req.body.type
      }
      if (req.body.title) {
        newSlide.title = req.body.title
      }
      if (req.body.description) {
        newSlide.description = req.body.description
      }
      if (req.body.duration) {
        newSlide.duration = req.body.duration
      }
      if (req.body.slideshowID) {
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
      form.parse(req, (err, fields, files) => {
        if (err) {
          res.json({
            result: 'error',
            message: 'Cannot upload file, Error: ${err}'
          })
        } else {
          const filePath = files.data.path
          newSlide.data = filePath
          return addSlideToSlideShow(slideshowID, newSlide, next)
        }
      })
      // Checks to make sure the slideShow exists, then adds and saves
    } catch (err) {
      console.error(err)
      next(err)
    }
  })

// Route: /api/v1/slide/:id
router
  .get('/:id', (req, res, next) => {
    const { id } = req.params
    return Slide.findById(id)
      .populate('slides')
      .then(slide => {
        return res.json(slide)
      })
      .catch(err => next(err))
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params
    return Slide.findByIdAndRemove(id)
      .then(slide => {
        if (!slide) return next('Slide not found')
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
        if (!slide) return next('Slide not found')
        /*
         * try {
         * slide.data = req.body.data
         *} catch (e) {}
         */
        if (req.body.data) {
          slide.data = req.body.data
        }
        if (req.body.type) {
          slide.type = req.body.type
        }
        if (req.body.title) {
          slide.title = req.body.title
        }
        if (req.body.description) {
          slide.description = req.body.description
        }
        if (req.body.duration) {
          slide.duration = req.body.duration
        }
        try {
          slide.slideshow = req.body.slideShowID
          console.error('Switching slide to a different slideshow currently not implemented')
        } catch (e) {}
        slide
          .save()
          .then(() => {
            return res.send('success')
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
function addSlideToSlideShow(slideShowID, slide, next) {
  Slideshow.findById(slideShowID)
    .then(slideshow => {
      if (!slideshow) return next('Slide not found')
      slide
        .save()
        .then(slide => {
          if (!slide) return next('Slide not saved ??')
          slideshow.slides.push(slide._id).catch(err => next(err))
          slideshow
            .save()
            .then(slideshow => {
              if (!slideshow) return next('Slideshow not saved ??')
              return 'Slide succesfully created'
            })
            .catch(err => next(err))
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
}

function deleteSlideFromSlideShow(slide, next, res) {
  var slideShowID = slide.slideshow
  Slideshow.findById(slideShowID).then(slideshow => {
    if (!slideshow) return next('Slideshow not found, not sure what the move is')
    slideshow.slides.remove(slideShowID)
    slideshow.save().then(slideshow => {
      if (!slideshow) return next('Slideshow not found, not sure what the move is')
      return res.send('success')
    })
  })
}
