const mongoose = require('mongoose')
const Schema = mongoose.Schema

const slide = new Schema({
    URL: { type: String },
    type: { type: String, default: },
    title: {type: String},
    descritpion: {type: String},
    time: {type: Number, default: 5, min: 1}
})

const slideShow = new Schema({
    title: {type: String},
    descritpion: {type: String},
    
})

//module.exports = mongoose.model('member', groupMember)

module.exports = {
    SLIDE: mongoose.model('slide', slide),
    SLIDESHOW: mongoose.model('slideshow', slideShow)
}