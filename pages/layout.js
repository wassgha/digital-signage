import React from 'react'
import GridLayout from 'react-grid-layout'
// import { MenuItem, DropdownButton } from '@trendmicro/react-dropdown'
import axios from 'axios'

import Frame from '../components/Admin/Frame.js'
import EditableWidget from '../components/Admin/Widgets/EditableWidget'
import WidthProvider from '../components/Admin/Widgets/WidthProvider'
import DropdownButton from '../components/DropdownButton'

import { WidgetType } from '../constants'

const GridLayoutWithWidth = WidthProvider(GridLayout)

class Layout extends React.Component {
  static async getInitialProps({ req }) {
    const host =
      req && req.headers && req.headers.host ? 'http://' + req.headers.host : window.location.origin
    const { data: widgets } = await axios.get(host + '/api/v1/widgets')

    return { widgets }
  }

  constructor(props) {
    super(props)
    this.state = {
      widgets: props.widgets || []
    }
  }

  addWidget = type => {
    return axios
      .post('/api/v1/widgets', {
        type
      })
      .then(this.getWidgets)
  }

  getWidgets = () => {
    return axios.get('/api/v1/widgets').then(res => {
      if (res && res.data) {
        this.setState({ widgets: res.data })
      }
    })
  }

  deleteWidget = id => {
    return axios.delete('/api/v1/widgets/' + id).then(this.getWidgets)
  }

  onLayoutChange = layout => {
    for (const widget of layout) {
      axios.put('/api/v1/widgets/' + widget.i, {
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
            choices={Object.keys(WidgetType).map(widgetType => ({
              key: widgetType,
              name: WidgetType[widgetType].name,
              icon: WidgetType[widgetType].icon
            }))}
          />
        </div>
        <GridLayoutWithWidth
          className='layout'
          layout={layout}
          cols={6}
          onLayoutChange={this.onLayoutChange}
        >
          {widgets.map(widget => (
            <div key={widget._id}>
              <EditableWidget
                type={WidgetType[widget.type]}
                onDelete={this.deleteWidget.bind(this, widget._id)}
              />
            </div>
          ))}
          {/* <div key='a'>
            <EditableWidget type={WidgetType.slideshow} />
          </div>
          <div key='b'>
            <EditableWidget type={WidgetType.weather} />
          </div>
          <div key='c'>
            <EditableWidget type={WidgetType.list} />
          </div>
          <div key='d'>
            <EditableWidget type={WidgetType.button} />
          </div>
          <div key='e'>
            <EditableWidget type={WidgetType.text} />
          </div> */}
        </GridLayoutWithWidth>
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
          `}
        </style>
      </Frame>
    )
  }
}

export default Layout
