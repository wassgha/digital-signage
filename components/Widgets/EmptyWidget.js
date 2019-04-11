import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

class EmptyWidget extends React.Component {
  render() {
    return (
      <div className={'widget'}>
        <div className={'info'}>
          <div className={'icon'}>
            <FontAwesomeIcon icon={faTimes} size={'2x'} />
          </div>
          <span className={'type'}>BROKEN WIDGET</span>
        </div>
        <style jsx>
          {`
            .widget {
              background-color: rgba(108, 108, 108, 1);
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
            .widget .info {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              color: white;
            }
            .widget .info .icon {
              color: white;
              margin-bottom: 16px;
            }
            .widget .info .type {
              color: white;
              font-family: 'Open Sans', sans-serif;
              text-transform: uppercase;
              font-size: 16px;
              margin-bottom: 16px;
            }
          `}
        </style>
      </div>
    )
  }
}

export default EmptyWidget
