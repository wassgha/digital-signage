import Widget from '../models/Widget.js'
import Display from '../models/Display.js'
import CommonHelper from './common_helper.js'

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

export default {
  deleteWidgets,
  newDisplay
}
