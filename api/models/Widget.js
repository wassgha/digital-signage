const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Constants = require('../../constants')

const Widget = new Schema({
  type: { type: String, enum: Object.keys(Constants.WidgetType) },
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  w: { type: Number, default: 1 },
  h: { type: Number, default: 1 },
  data: { type: Schema.Types.Mixed }
})

module.exports = mongoose.model('Widget', Widget)
