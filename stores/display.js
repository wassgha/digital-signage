import { store } from '@risingstack/react-easy-state'
import _ from 'lodash'
import * as DisplayActions from '../actions/display.js'
import shortid from 'shortid'

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
  },
  addStatusBarItem(type) {
    display.statusBar = [...display.statusBar, type + '_' + shortid.generate()]
    updateDisplayThrottled(display.id, { statusBar: display.statusBar })
    return Promise.resolve()
  },
  removeStatusBarItem(id) {
    display.statusBar = [...display.statusBar.slice(0, id).concat(display.statusBar.slice(id + 1))]
    updateDisplayThrottled(display.id, { statusBar: display.statusBar })
  },
  reorderStatusBarItems(startIndex, endIndex) {
    const result = Array.from(display.statusBar)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    display.statusBar = result
    updateDisplayThrottled(display.id, { statusBar: display.statusBar })
  }
})

export default display
