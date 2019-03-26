const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * This schema is used to keep track of URLs of data
 * This isnt really needed, but might be useful for book keeping
 */
const DataURL = new Schema({
  data: { type: String},
  used: { type: Boolean, default: false}
})

module.exports = mongoose.model('DataURL', DataURL)
