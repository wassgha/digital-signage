/**
 * @fileoverview Slideshow component that given an array of slide descriptions
 * of mixed types, renders the slides and automatically plays the slideshow for
 * the given durations
 */

import React, { Component } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false

const DEFAULT_COLOR = '#2d3436'
const DEFAULT_FIT = 'contain'

class ImageContent extends Component {
  constructor(props) {
    super(props)
    this.iframe = React.createRef()
  }

  render() {
    const { data: { title, url, fit = DEFAULT_FIT, color = DEFAULT_COLOR } = {} } = this.props
    return (
      <div className='image'>
        {title && (
          <div className='titleConainer'>
            <div className='title'>{title}</div>
          </div>
        )}
        <div className='content' style={{ background: color }}>
          <div
            className='photocover'
            style={{
              backgroundImage: `url(${url})`
            }}
          />
          <div
            className='photo'
            style={{
              backgroundImage: `url(${url})`
            }}
          />
        </div>
        <style jsx>
          {`
            .image {
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
            .image .content {
              flex: 1;
              border: none;
              overflow: hidden;
              position: relative;
            }
            .image .titleConainer {
              padding: 12px;
            }
            .image .title {
              font-family: 'Open Sans', sans-serif;
              border-left: 3px solid rgba(255, 255, 255, 0.5);
              font-size: 16px;
              padding-left: 12px;
              font-weight: 600;
              text-transform: uppercase;
              z-index: 1;
            }
            .photocover {
              width: 110%;
              height: 110%;
              background-size: cover;
              background-repeat: no-repeat;
              background-position: 50% 50%;
              filter: blur(20px);
              position: absolute;
              top: -5%;
              left: -5%;
            }
            .photo {
              width: 100%;
              height: 100%;
              background-size: ${fit};
              background-repeat: no-repeat;
              background-position: 50% 50%;
              position: absolute;
              top: 0;
              left: 0;
            }
            .invisible {
              width: 1px;
              height: 1px;
              display: none;
              visibility: hidden;
            }
          `}
        </style>
      </div>
    )
  }
}

export default ImageContent
