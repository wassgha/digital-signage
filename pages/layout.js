import React from 'react'
import GridLayout from 'react-grid-layout'

import Frame from '../components/Admin/Frame.js'
import EditableWidget from '../components/Admin/Widgets/EditableWidget'
import WidthProvider from '../components/Admin/Widgets/WidthProvider'

import { WidgetType } from '../constants'

import '../styles/GridLayoutStyles.css'
import 'react-resizable/css/styles.css'

const GridLayoutWithWidth = WidthProvider(GridLayout)

class Layout extends React.Component {
  render() {
    const layout = [
      { i: 'a', x: 0, y: 0, w: 1, h: 1 },
      { i: 'b', x: 1, y: 0, w: 3, h: 3, minW: 2, maxW: 4 },
      { i: 'c', x: 4, y: 0, w: 2, h: 2 },
      { i: 'd', x: 0, y: 2, w: 1, h: 1 },
      { i: 'e', x: 4, y: 4, w: 1, h: 1 }
    ]
    return (
      <Frame>
        <h1>Layout</h1>
        <GridLayoutWithWidth className='layout' layout={layout} cols={6}>
          <div key='a'>
            <EditableWidget type={WidgetType.Slideshow} />
          </div>
          <div key='b'>
            <EditableWidget type={WidgetType.Weather} />
          </div>
          <div key='c'>
            <EditableWidget type={WidgetType.List} />
          </div>
          <div key='d'>
            <EditableWidget type={WidgetType.Button} />
          </div>
          <div key='e'>
            <EditableWidget type={WidgetType.Text} />
          </div>
        </GridLayoutWithWidth>
        <style jsx>
          {`
            h1 {
              font-family: 'Open Sans', sans-serif;
              font-size: 24px;
              color: #4f4f4f;
              margin: 0px;
              margin-bottom: 16px;
            }
          `}
        </style>
      </Frame>
    )
  }
}

export default Layout
