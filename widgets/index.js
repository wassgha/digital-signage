import widgetList from './list'

const widgets = {}
for (const widget of widgetList) {
  const WidgetClass = require('./' + widget).default
  widgets[widget] = new WidgetClass()
}

module.exports = widgets
