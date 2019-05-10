/**
 * @fileoverview Slideshow component that given an array of slide descriptions
 * of mixed types, renders the slides and automatically plays the slideshow for
 * the given durations
 */

import React, { Component } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false

const DEFAULT_COLOR = '#34495e'
const DEFAULT_URL = 'https://compsci.lafayette.edu/'

class WebContent extends Component {
  constructor(props) {
    super(props)
    this.iframe = React.createRef()
  }

  render() {
    const { data: { title, url = DEFAULT_URL, color = DEFAULT_COLOR } = {} } = this.props
    return (
      <div className='web'>
        {title && (
          <div className='titleConainer'>
            <div className='title'>{title}</div>
          </div>
        )}
        <div className='iframeContainer'>
          <iframe src={url} className='iframe' ref={this.iframe} />
        </div>
        <style jsx>
          {`
            .web {
              position: relative;
              box-sizing: border-box;
              height: 100%;
              width: 100%;
              background: ${color};
              flex: 1;
              font-family: 'Open Sans', sans-serif;
              display: flex;
              flex-direction: column;
            }
            .web .iframeContainer {
              flex: 1;
              border: none;
              overflow: hidden;
            }
            .web .iframe {
              flex: 1;
              border: none;
              width: 100%;
              height: 100%;
            }
            .web .titleConainer {
              padding: 12px;
            }
            .web .title {
              font-family: 'Open Sans', sans-serif;
              border-left: 3px solid rgba(255, 255, 255, 0.5);
              font-size: 16px;
              padding-left: 12px;
              font-weight: 600;
              text-transform: uppercase;
              z-index: 1;
            }
          `}
        </style>
      </div>
    )
  }
}

export default WebContent
