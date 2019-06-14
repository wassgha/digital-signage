const mongoose = require('mongoose')
const widgetList = require('../../widgets/widget_list')
const Schema = mongoose.Schema

const Widget = new Schema({
  type: { type: String, enum: widgetList },
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  w: { type: Number, default: 1 },
  h: { type: Number, default: 1 },
  data: { type: Schema.Types.Mixed },
  display: { type: Schema.Types.ObjectId, ref: 'Display' }
})

module.exports = mongoose.model('Widget', Widget)
