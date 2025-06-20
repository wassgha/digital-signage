import Display from '../models/Display.js'
import CommonHelper from './common_helper.js'

function addWidget(req, res) {
  let widget = req.crudify.result
  return Display.findById(widget.display)
    .then(display => {
      if (!display) return res.status(404).json({ error: 'Display not found' })
      display.widgets.push(widget._id)
      return display.save().then(display => {
        if (!display) return res.status(500).json({ error: 'Display not saved' })
        return res.json({ success: true })
      })
    })
    .catch(err => res.json(err))
}

function deleteWidget(req, res) {
  let widget = req.crudify.result
  return Display.findById(widget.display).then(display => {
    if (!display) return res.status(404).json({ error: 'Display not found' })
    display.widgets = display.widgets.filter(function(value) {
      return !widget._id.equals(value)
    })
    return display
      .save()
      .then(() => CommonHelper.broadcastUpdate(res.io))
      .then(() => {
        return res.json({ success: true })
      })
  })
}

export default {
  deleteWidget,
  addWidget
}
