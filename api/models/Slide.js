const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Slide = new Schema({
  data: { type: String, default: 'https://i.imgur.com/3MlKktU.jpg' },
  type: {
    type: String,
    default: 'photo',
    enum: ['photo', 'web', 'youtube', 'video']
  },
  title: { type: String, default: 'Unnamed Slide' },
  description: { type: String, default: 'Undescribed Slide' },
  duration: { type: Number, default: 5, min: 1 },
  slideshow: { type: Schema.Types.ObjectId, ref: 'Slideshow' },
  order: { type: Number }
})

module.exports = mongoose.model('Slide', Slide)
