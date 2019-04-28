/**
 * @fileoverview Shows the display frame and renders all the
 * widgets inside of it
 */

import React from 'react'
import GridLayout from 'react-grid-layout'
import socketIOClient from 'socket.io-client'

import Frame from './Frame.js'
import HeightProvider from '../Widgets/HeightProvider'
import Widgets from '../../widgets'
import EmptyWidget from '../Widgets/EmptyWidget'

import { getWidgets } from '../../actions/widgets'

class Display extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      widgets: props.widgets || []
    }
  }

  componentDidMount() {
    this.refresh()
    const { host = 'http://localhost' } = this.props
    const socket = socketIOClient(host)
    socket.on('admin:update', () => this.refresh())
  }

  refresh = () => {
    return getWidgets().then(widgets => {
      this.setState({ widgets })
    })
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

    const GridLayoutWithHeight = HeightProvider(GridLayout, this.container)

    return (
      <Frame>
        <div className={'gridContainer'} ref={ref => (this.container = ref)}>
          <GridLayoutWithHeight
            className='layout'
            isDraggable={false}
            isResizable={false}
            layout={layout}
            cols={6}
          >
            {widgets.map(widget => {
              const Widget = Widgets[widget.type] ? Widgets[widget.type].Widget : EmptyWidget
              return (
                <div key={widget._id} className={'widget'}>
                  <Widget data={widget.data} />
                </div>
              )
            })}
          </GridLayoutWithHeight>
          <style jsx>
            {`
              .gridContainer {
                flex: 1;
                overflow: hidden;
                margin-bottom: 10px;
              }
              .widget {
                border-radius: 6px;
                overflow: hidden;
              }
            `}
          </style>
        </div>
      </Frame>
    )
  }
}

export default Display
