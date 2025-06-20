import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Slideshow = new Schema({
  title: { type: String },
  slides: [{ type: Schema.Types.ObjectId, ref: 'Slide' }]
})

export default mongoose.model('Slideshow', Slideshow)
