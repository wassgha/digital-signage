/* eslint-disable multiline-comment-style */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const slide = new Schema({
    URL: { type: String },
    type: { type: String, default: "photo", enum: ['photo', 'web', 'youtube', 'video']},
    title: {type: String},
    descritpion: {type: String},
    time: {type: Number, default: 5, min: 1}
})

const slideShow = new Schema({
    title: {type: String},
    descritpion: {type: String},
    //slides: {type: [slide]}
    slides: [{type: Schema.Types.ObjectId, ref: "slide"}]
})
//try{
module.exports = {
    SLIDE: mongoose.model('slide', slide),
    SLIDESHOW: mongoose.model('slideshow', slideShow)
}
//}catch(e){
    // eslint-disable-next-line no-console
    //console.log(e)
//}