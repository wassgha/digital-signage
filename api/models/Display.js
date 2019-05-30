const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Display = new Schema({
  name: { type: String },
  layout: { type: String, default: 'spaced', enum: ['compact', 'spaced'] },
  statusBar: {
    type: [{ type: String, enum: ['time', 'date', 'connection', 'spacer'] }],
    default: ['date', 'spacer', 'connection', 'time']
  },
  widgets: [{ type: Schema.Types.ObjectId, ref: 'Widget' }]
})

module.exports = mongoose.model('Display', Display)
