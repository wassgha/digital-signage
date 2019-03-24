/* eslint-disable multiline-comment-style */
let mongoose
let slideShowSchema
try {
  mongoose = require("mongoose")
  slideShowSchema = require("../models/sildeShowSchema")
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e)
}

/**
 * Will return an array like {[_id, title], [_id, title]}
 * Returns:
 * _id: _id of the slide shows
 * title: The title of the slideshow
 */

async function returnSlideShows() {
  var slideShow = slideShowSchema.SLIDESHOW
  // eslint-disable-next-line no-console
  console.log("Frogs are turning the chemicels gay")
  await slideShow
    .find({})
    .select("_id title")
    .exec(function(err, slideShows) {
      // eslint-disable-next-line no-console
      if (err) return console.error(err)
      // eslint-disable-next-line no-console
      console.log("teting inside " + slideShows)
      return slideShows
    })
}

/**
 *
 * @param {*} id - Give the ID of the slide show you want
 * Returns:
 * A full slideshow
 * Use .slides to get individual slides
 */
async function getSlideShow(id) {
  var slideShow = slideShowSchema.SLIDESHOW
  await slideShow
    .findById(id)
    .populate("slides")
    .exec(function(err, slideshow) {
      // eslint-disable-next-line no-console
      if (err) return console.error(err)
      return slideshow
    })
}

/**
 * Will return an array like {[_id, title], [_id, title]}
 * Returns:
 * _id: _id of the slide
 * title: The title of the slide
 */
async function returnSlides() {
  var slide = slideShowSchema.SLIDE
  await slide
    .find({})
    .select("_id title")
    .exec(function(err, slides) {
      // eslint-disable-next-line no-console
      if (err) return console.error(err)
      return slides
    })
}

/**
 *
 * @param {*} id - Give the ID of the slide you want
 * Returns:
 * A full slide
 */
async function getSlide(id) {
  var slide = slideShowSchema.SLIDE
  await slide.findById(id).exec(function(err, slid) {
    // eslint-disable-next-line no-console
    if (err) return console.error(err)
    return slid
  })
}

/**
 * Deletes every item in slide and slideshows
 * USE ONLY FOR TESTING
 */
async function clearALLSlidesandShows() {
  var slide = slideShowSchema.SLIDE
  var slideShow = slideShowSchema.SLIDESHOW
  await slide.deleteMany({}).exec(function(err) {
    // eslint-disable-next-line no-console
    if (err) return console.error(err)
    // eslint-disable-next-line no-console
    console.log("Deleted slides")
  })
  slideShow.deleteMany({}).exec(function(err) {
    // eslint-disable-next-line no-console
    if (err) return console.error(err)
    // eslint-disable-next-line no-console
    console.log("deleted slideshows")
  })
}

module.exports = {
  returnSlideShows: async function() {
    return await returnSlideShows()
  },
  getSlideShow: async function(id) {
    return await getSlideShow(id)
  },
  //For functions without args, and just do function:function
  returnSlides: async function() {
    return await returnSlides()
  },
  //For functions, that need args. this is the only nice way I found
  getSlide: async function(id) {
    return await getSlide(id)
  },
  clearALLSlidesandShows: async function() {
    return await clearALLSlidesandShows()
  },
  slide: slideShowSchema.SLIDE,
  slideShow: slideShowSchema.SLIDESHOW
}
