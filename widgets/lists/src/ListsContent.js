/**
 * @fileoverview Slideshow component that given an array of slide descriptions
 * of mixed types, renders the slides and automatically plays the slideshow for
 * the given durations
 */

import React, { Component } from 'react'
import Lottie from 'react-lottie'
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false

const DEFAULT_COLOR = '#463215'
const DEFAULT_TEXT_COLOR = '#ffffff'
const DEFAULT_TEXT = 'List stuff here'

class ListsContent extends Component {
  render() {
    const {
      data: {
        text = DEFAULT_TEXT,
        textColor = DEFAULT_TEXT_COLOR,
        color = DEFAULT_COLOR,
        list = []
      } = {}
    } = this.props
    return (
      <div className='congrats'>
        <div className='background'>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
          />
          <div>
            <li>list</li>
          </div>
        </div>
        <div className='text'>{text}</div>
        <style jsx>
          {`
            .congrats {
              position: relative;
              box-sizing: border-box;
              height: 100%;
              width: 100%;
              background: ${color};
              color: ${textColor};
              flex: 1;
              padding: 16px;
              font-family: 'Open Sans', sans-serif;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
            }
            .congrats .background {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 0;
            }
            .congrats .text {
              font-family: 'Open Sans', sans-serif;
              font-size: 1.3em;
              padding: 16px;
              font-weight: 600;
              text-align: center;
              z-index: 1;
            }
          `}
        </style>
      </div>
    )
  }
}

export default ListsContent
