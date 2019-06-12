const ReactEasyState = require('react-easy-state')
const store = ReactEasyState.store
const _ = require('lodash')
const DisplayActions = require('../actions/display')

const updateDisplayThrottled = _.debounce((id, data) => {
  return DisplayActions.updateDisplay(id, data)
}, 300)

const display = store({
  id: null,
  name: null,
  layout: null,
  statusBar: null,
  widgets: null,
  async setId(id) {
    if (!id) return
    display.id = id
    const displayInfo = await DisplayActions.getDisplay(id)
    display.layout = displayInfo.layout
    display.statusBar = displayInfo.statusBar
    display.name = displayInfo.name
    display.widgets = displayInfo.widgets
  },
  setName(name) {
    if (!name) return
    display.name = name
  },
  updateName(name) {
    if (!name) return
    display.name = name
    updateDisplayThrottled(display.id, { name })
  },
  updateLayout(layout) {
    if (!layout || !['spaced', 'compact'].includes(layout)) return
    display.layout = layout
    updateDisplayThrottled(display.id, { layout })
  }
})

module.exports = display
