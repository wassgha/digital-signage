const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Slideshow = new Schema({
  title: { type: String },
  slides: [{ type: Schema.Types.ObjectId, ref: 'Slide' }]
})

module.exports = mongoose.model('Slideshow', Slideshow)
