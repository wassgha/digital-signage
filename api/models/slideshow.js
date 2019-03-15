const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
 * SlideShow.slides = [1Slide._id, 2Slide._id]->
 * Does not matter if you save slide first or after slideshow.save
 * When finding in slideshow, you need to populate slides
 * slideShow.find(function(err, data){
 * // eslint-disable-next-line no-console
 * if (err) return console.error(err)
 *     }).populate("slides").
 *     exec(function (err, data) {
 *        // eslint-disable-next-line no-console
 *        if (err) return console.error(err)
 *        // eslint-disable-next-line no-console
 *        console.error("After populate")
 *        // eslint-disable-next-line no-console
 *        console.error(data[0].slides)
 * })
 */
const slideShow = new Schema({
    title: {type: String},
    description: {type: String},
    slides: [{type: Schema.Types.ObjectId, ref: "slide"}]
})


module.exports = {
    SLIDESHOW: mongoose.model('slideshow', slideShow)
}