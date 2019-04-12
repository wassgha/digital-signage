import React from 'react'
import GridLayout from 'react-grid-layout'

import Frame from '../components/Admin/Frame.js'
import EditableWidget from '../components/Admin/EditableWidget'
import WidthProvider from '../components/Widgets/WidthProvider'
import DropdownButton from '../components/DropdownButton'

import Widgets from '../widgets'

import { addWidget, getWidgets, deleteWidget, updateWidget } from '../actions/widgets'

const GridLayoutWithWidth = WidthProvider(GridLayout)

class Layout extends React.Component {
  static async getInitialProps({ req }) {
    const host =
      req && req.headers && req.headers.host ? 'http://' + req.headers.host : window.location.origin
    const widgets = await getWidgets(host)

    return { widgets }
  }

  constructor(props) {
    super(props)
    this.state = {
      widgets: props.widgets || []
    }
  }

  refresh = () => {
    return getWidgets().then(widgets => {
      this.setState({ widgets })
    })
  }

  addWidget = type => {
    return addWidget(type).then(this.refresh)
  }

  deleteWidget = id => {
    return deleteWidget(id).then(this.refresh)
  }

  onLayoutChange = layout => {
    for (const widget of layout) {
      updateWidget(widget.i, {
        x: widget.x,
        y: widget.y,
        w: widget.w,
        h: widget.h
      })
    }
  }

  render() {
    const { widgets } = this.state
    const layout = widgets.map(widget => ({
      i: widget._id,
      x: widget.x || 0,
      y: widget.y || 0,
      w: widget.w || 1,
      h: widget.h || 1
    }))

    return (
      <Frame>
        <div className={'head'}>
          <h1>Layout</h1>
          <DropdownButton
            icon='plus'
            text='Add Widget'
            onSelect={this.addWidget}
            choices={Object.keys(Widgets).map(widget => ({
              key: widget,
              name: Widgets[widget].name,
              icon: Widgets[widget].icon
            }))}
          />
        </div>
        <div className='layout'>
          <GridLayoutWithWidth
            layout={layout}
            cols={6}
            onLayoutChange={this.onLayoutChange}
            draggableCancel={'.ReactModalPortal,.controls'}
          >
            {widgets.map(widget => (
              <div key={widget._id}>
                <EditableWidget
                  id={widget._id}
                  type={widget.type}
                  onDelete={this.deleteWidget.bind(this, widget._id)}
                />
              </div>
            ))}
          </GridLayoutWithWidth>
        </div>
        <style jsx>
          {`
            h1 {
              font-family: 'Open Sans', sans-serif;
              font-size: 24px;
              color: #4f4f4f;
              margin: 0px;
              display: inline-block;
              margin-right: 16px;
            }
            .head {
              margin-bottom: 24px;
              display: flex;
              flex-direction: row;
              align-items: center;
            }
            .layout {
              background: #dfdfdf;
              border-radius: 8px;
            }
          `}
        </style>
      </Frame>
    )
  }
}

export default Layout
