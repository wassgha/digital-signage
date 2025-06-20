import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Slide = new Schema({
  data: { type: String, default: '' },
  type: {
    type: String,
    default: 'photo',
    enum: ['photo', 'web', 'youtube', 'video']
  },
  title: { type: String },
  description: { type: String },
  duration: { type: Number, default: 5, min: 1 },
  slideshow: { type: Schema.Types.ObjectId, ref: 'Slideshow' }
})

export default mongoose.model('Slide', Slide)
