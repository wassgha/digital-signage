const mongoose = require("mongoose")
const Schema = mongoose.Schema

const SLIDESHOW = new Schema({
  title: { type: String },
  slides: [{ type: Schema.Types.ObjectId, ref: "Slide" }]
})

module.exports = mongoose.model("SLIDESHOW", SLIDESHOW)
