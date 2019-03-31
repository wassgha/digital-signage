/**
 * @fileoverview Progress bar component that shows which slide
 * is the currently displayed slide.
 */

import { Component } from 'react'

class Progress extends Component {
  render() {
    const { current, defaultDuration, orderedSlides, ready } = this.props
    return (
      <div className='progress-bar'>
        {orderedSlides.map((slide, i) => (
          <div key={`slide-${i}`} className={`progress-segment ${i < current && 'active'}`}>
            <div
              className={'progress-segment-content'}
              style={{
                width: i == current && ready ? '100%' : '0%',
                transition:
                  i == current && ready
                    ? `all linear ${slide.duration || defaultDuration / 1000}s`
                    : 'none'
              }}
            />
          </div>
        ))}
        <style jsx>
          {`
            .progress-segment {
              height: 4px;
              border-radius: 4px;
              background: rgba(255, 255, 255, 0.4);
              margin: 2px;
              flex: 1;
            }
            .progress-segment.active {
              background: white;
            }
            .progress-segment-content {
              width: 0%;
              height: 100%;
              border-radius: 4px;
              background: white;
              transition: all linear 5s;
            }
            .progress-bar {
              display: flex;
              flex-direction: row;
              width: 100%;
              position: absolute;
              bottom: 0;
              left: 0;
            }
          `}
        </style>
      </div>
    )
  }
}

export default Progress
