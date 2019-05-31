const Widget = require('../models/Widget')
const Display = require('../models/Display')
const CommonHelper = require('./common_helper')

function deleteWidgets(widgets, res) {
  return Promise.all(
    widgets.map(widget => {
      return Widget.findByIdAndRemove(widget)
    })
  ).then(() => CommonHelper.broadcastUpdate(res.io))
}

async function newDisplay(req) {
  const count = await Display.estimatedDocumentCount()
  const newDisplay = new Display({
    name: req.body.name || 'Display #' + (count + 1)
  })
  return newDisplay.save()
}

module.exports = {
  deleteWidgets,
  newDisplay
}
