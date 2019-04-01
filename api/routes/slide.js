const express = require("express")
const router = express.Router()
const formidable = require("formidable")

const Slide = require("../models/Slide")

// Route: /api/v1/slide
router
  .get("/", (req, res, next) => {
    return Slide.find({})
      .then(slides => {
        return res.json(slides)
      })
      .catch(err => next(err))
  })
  .post("/", (req, res, next) => {
    try {
      const { title, description, duration, slideshow } = req.body
      // TODO(@alexander-e-andrews) Write code for adding a slide to the database

      console.log(req.body)
      var newSlide = new Slide()
      newSlide.title = title
      newSlide.description = description
      newSlide.duration = duration
      newSlide.save()
      var id = newSlide._id
    } catch (e) {
      console.error(e)
    }
  })

// Route: /api/v1/slide/:id
router
  .get("/:id", (req, res, next) => {
    const { id } = req.params
    return Slide.findById(id)
      .populate("slides")
      .then(slide => {
        return res.json(slide)
      })
      .catch(err => next(err))
  })
  .delete("/:id", (req, res, next) => {
    const { id } = req.params
    return Slide.findById(id)
      .then(slide => {
        if (!slide) return next("Slide not found")
        return slide.remove().then(() => {
          return res.send("success")
        })
      })
      .catch(err => next(err))
  })
  .patch("/:id", (req, res, next) => {
    const { id } = req.params
    // TODO(@alexander-e-andrews) Write code for editing a slide
  })

// Temporary code for upload (should be merged with the POST /api/v1/slide above)
router.post("/upload", (req, res) => {
  const form = new formidable.IncomingForm()
  form.uploadDir = "./uploads"
  form.keepExtensions = true
  form.multiples = false
  // Parse the sent data and save it + the path for alex
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.json({
        result: "error",
        message: "Cannot upload file, Error: ${err}"
      })
    }
    const filePath = files.data.path
  })
})

module.exports = router
