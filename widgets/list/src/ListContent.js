/**
 * @fileoverview Widget that displays a table of elements
 */

import React, { Component } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'

import AutoScroll from '../../../components/AutoScroll'

config.autoAddCss = false

const DEFAULT_COLOR = '#463215'
const DEFAULT_TEXT_COLOR = '#ffffff'

class ListContent extends Component {
  render() {
    const {
      data: { title, textColor = DEFAULT_TEXT_COLOR, color = DEFAULT_COLOR, list } = {}
    } = this.props
    return (
      <div className='listWidget'>
        {title && (
          <div className='titleConainer'>
            <div className='title'>{title}</div>
          </div>
        )}
        <div className='list'>
          <AutoScroll
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              paddingTop: 12,
              paddingBottom: 12
            }}
          >
            {list.map(({ text, label }) => (
              <div className='element'>
                <span className='text'>{text || 'Insert some text ...'}</span>
                {label && <div className='label'>{label}</div>}
              </div>
            ))}
          </AutoScroll>
        </div>
        <style jsx>
          {`
            .listWidget {
              position: relative;
              box-sizing: border-box;
              height: 100%;
              width: 100%;
              background: ${color};
              color: ${textColor};
              flex: 1;
              font-family: 'Open Sans', sans-serif;
              display: flex;
              flex-direction: column;
            }
            .listWidget .titleConainer {
              padding: 12px;
            }
            .listWidget .title {
              font-family: 'Open Sans', sans-serif;
              border-left: 3px solid rgba(255, 255, 255, 0.5);
              font-size: 16px;
              padding-left: 12px;
              font-weight: 600;
              text-transform: uppercase;
              z-index: 1;
            }
            .list {
              padding-right: 12px;
              padding-left: 12px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
            }
            .element {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              background: #000000aa;
              color: ${textColor};
              padding: 8px;
              margin-bottom: 8px;
              border-radius: 4px;
              width: 100%;
              box-sizing: border-box;
            }
            .label {
              display: inline-block;
              background: #ffffff22;
              color: ${textColor};
              padding: 8px;
              font-weight: 600;
              font-size: 12px;
              border-radius: 4px;
              box-sizing: content-box;
              align-self: flex-end;
            }
          `}
        </style>
      </div>
    )
  }
}

export default ListContent
