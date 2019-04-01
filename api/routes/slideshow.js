const express = require("express")
const router = express.Router()

const Slideshow = require("../models/Slideshow")

// Route: /api/v1/slideshow
router.get("/", (req, res, next) => {
  return Slideshow.find({})
    .populate("slides")
    .then(slideshows => {
      return res.json(slideshows)
    })
    .catch(err => next(err))
})

// Route: /api/v1/slideshow/:id
router
  .get("/:id", (req, res, next) => {
    const { id } = req.params
    return Slideshow.findById(id)
      .populate("slides")
      .then(slideshow => {
        return res.json(slideshow)
      })
      .catch(err => next(err))
  })
  .delete("/:id", (req, res, next) => {
    const { id } = req.params
    return Slideshow.findById(id)
      .then(slideshow => {
        if (!slideshow) return next("Slideshow not found")
        return slideshow.remove().then(() => {
          return res.send("success")
        })
      })
      .catch(err => next(err))
  }) //Adding new slide
  .post("/:id", (req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(req.params)
    // eslint-disable-next-line no-console
    console.log(req.body)
  })
  .patch("/:id", (req, res, next) =>{
    
  })

module.exports = router
