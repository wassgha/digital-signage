/* eslint-disable multiline-comment-style */
let mongoose
let slideShowSchema
try{
mongoose = require("mongoose")
slideShowSchema = require("../models/sildeShowSchema")
}catch(e){
    // eslint-disable-next-line no-console
    console.log(e)
}

/**
 * Will return an array like {[_id, title], [_id, title]}
 * Returns:
 * _id: _id of the slide shows
 * title: The title of the slideshow
 */

function returnSlideShows()
{
    var slideShow = slideShowSchema.SLIDESHOW
    slideShow.find({}, '_id title', function(err, slideShows) {
        // eslint-disable-next-line no-console
        if (err) return console.error(err)
        // eslint-disable-next-line no-console
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
function getSlideShow(id)
{
    var slideShow = slideShowSchema.SLIDESHOW
    slideShow.findById(id, function(err, slideShow){
        // eslint-disable-next-line no-console
        if (err) return console.error(err)
    }).populate("slides").
    exec(function (err, slideshow) {
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
function returnSlides(){
    var slide = slideShowSchema.SLIDE
    slide.find({}, '_id title', function(err, slides) {
        // eslint-disable-next-line no-console
        if (err) return console.error(err)
        // eslint-disable-next-line no-console
        console.log("DOING RETURN SLIDES" + slides)
        return slides
      })
}

/**
 * 
 * @param {*} id - Give the ID of the slide you want
 * Returns:
 * A full slide
 */
function getSlide(id)
{
    var slide = slideShowSchema.SLIDE
    slide.findById(id, function(err, slid){
        // eslint-disable-next-line no-console
        if (err) return console.error(err)
        // eslint-disable-next-line no-console
        console.log("DOING RETURN SLIDE" + slid)
        return slid
    })
}


/**
 * Deletes every item in slide and slideshows
 * USE ONLY FOR TESTING
 */
function clearALLSlidesandShows(){

    var slide = slideShowSchema.SLIDE
    var slideShow = slideShowSchema.SLIDESHOW
    slide.deleteMany({}, function(err){
      // eslint-disable-next-line no-console
      if (err) return console.error(err)
      // eslint-disable-next-line no-console
      console.log("Deleted slides")
    })
    slideShow.deleteMany({}, function(err){
      // eslint-disable-next-line no-console
      if (err) return console.error(err)
      // eslint-disable-next-line no-console
      console.log("deleted slideshows")
    })
  }


module.exports = {
    returnSlideShows: returnSlideShows(),
    getSlideShow: getSlideShow(),
    //For functions without args, and just do function:function
    returnSlides: function() {returnSlides()},
    //For functions, that need args. this is the only nice way I found
    getSlide: function(id){ getSlide(id)},
    clearALLSlidesandShows: clearALLSlidesandShows(),
    slide: slideShowSchema.SLIDE,
    slideShow: slideShowSchema.SLIDESHOW

  }
