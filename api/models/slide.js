const mongoose = require('mongoose')
const Schema = mongoose.Schema

const slide = new Schema({
    data: { type: String, default: "https://i.imgur.com/3MlKktU.jpg" },
    type: { type: String, default: "photo", enum: ['photo', 'web', 'youtube', 'video']},
    title: {type: String},
    description: {type: String},
    duration: {type: Number, default: 5, min: 1}
})

module.exports = {
    SLIDE: mongoose.model('slide', slide)
}