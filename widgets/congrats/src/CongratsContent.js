/**
 * @fileoverview Slideshow component that given an array of slide descriptions
 * of mixed types, renders the slides and automatically plays the slideshow for
 * the given durations
 */

import React, { Component } from 'react'
import Lottie from 'lottie-react'
import { config } from '@fortawesome/fontawesome-svg-core'
import AutoScroll from '../../../components/AutoScroll'

config.autoAddCss = false

const DEFAULT_COLOR = '#34495e'
const DEFAULT_TEXT_COLOR = '#ffffff'
const DEFAULT_ANIMATION = 'confetti'
const DEFAULT_TEXT = 'Congratulations!'
const DEFAULT_FONT_SIZE = 16

class CongratsContent extends Component {
  render() {
    const {
      data: {
        text = DEFAULT_TEXT,
        textColor = DEFAULT_TEXT_COLOR,
        animation = DEFAULT_ANIMATION,
        fontSize = DEFAULT_FONT_SIZE,
        color = DEFAULT_COLOR
      } = {}
    } = this.props
    return (
      <div className='congrats'>
        <div className='background'>
          <Lottie
            animationData={require('./animations/' + animation + '.json')}
            loop={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <AutoScroll style={{ display: 'block' }}>
          <div className='text'>
            {text.split('\n').map((line, index) => (
              <div key={index}>{line || <br />}</div>
            ))}
          </div>
        </AutoScroll>
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
              font-size: ${fontSize}px;
              padding: 16px;
              font-weight: 600;
              text-align: center;
              z-index: 1;
              word-break: break-word;
              min-height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              box-sizing: border-box;
            }
          `}
        </style>
      </div>
    )
  }
}

export default CongratsContent
