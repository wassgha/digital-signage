/**
 * @fileoverview Slideshow component that given an array of slide descriptions
 * of mixed types, renders the slides and automatically plays the slideshow for
 * the given durations
 */

import React, { Component } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import getVideoId from 'get-video-id'
import YouTube from 'react-youtube'

config.autoAddCss = false

const DEFAULT_COLOR = '#95a5a6'
const DEFAULT_URL = 'https://www.youtube.com/watch?v=9xwazD5SyVg'

class YoutubeContent extends Component {
  constructor(props) {
    super(props)
    this.iframe = React.createRef()
  }

  render() {
    const { data: { title, url = DEFAULT_URL, color = DEFAULT_COLOR } = {} } = this.props
    const { id, service } = getVideoId(url)
    return (
      <div className='youtube'>
        {title && (
          <div className='titleConainer'>
            <div className='title'>{title}</div>
          </div>
        )}
        <div className='iframeContainer'>
          {!id || service !== 'youtube' ? (
            <div>Invalid Youtube URL</div>
          ) : (
            <YouTube
              containerClassName={'youtube-container-nojsx'}
              videoId={id}
              opts={{
                /* eslint-disable camelcase */
                height: '100%',
                width: '100%',
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  start: 0,
                  cc_load_policy: 0,
                  fs: 0,
                  iv_load_policy: 3,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0
                }
                /* eslint-enable camelcase */
              }}
            />
          )}
        </div>
        <style>
          {`
                .youtube-container-nojsx {
                  width: 100%;
                  height: 100%;
                  min-height: 100%;
                }
              `}
        </style>
        <style jsx>
          {`
            .youtube {
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
            .youtube .iframeContainer {
              flex: 1;
              border: none;
              overflow: hidden;
            }
            .youtube .iframe {
              flex: 1;
              border: none;
              width: 100%;
              height: 100%;
            }
            .youtube .titleConainer {
              padding: 12px;
            }
            .youtube .title {
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

export default YoutubeContent
