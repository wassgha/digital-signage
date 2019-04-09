import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlay,
  faFont,
  faList,
  faMousePointer,
  faCloudSun,
  faCalendar
} from '@fortawesome/free-solid-svg-icons'

library.add(faList)
library.add(faPlay)
library.add(faFont)
library.add(faMousePointer)
library.add(faCloudSun)
library.add(faCalendar)

import { WidgetType } from '../../../constants'

class EditableWidget extends React.Component {
  render() {
    const { type = WidgetType.Slideshow } = this.props
    return (
      <div className={'widget'}>
        <div className={'info'}>
          <div className={'icon'}>
            <FontAwesomeIcon icon={type.icon} size={'2x'} />
          </div>
          <span className={'type'}>{type.name}</span>
          <span className={'name'}>NEWS</span>
        </div>
        <style jsx>
          {`
            .widget {
              background-color: rgba(108, 108, 108, 1);
              border-radius: 6px;
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
            .widget .info .name {
              color: white;
              font-family: 'Open Sans', sans-serif;
              text-transform: uppercase;
              font-size: 12px;
            }
          `}
        </style>{' '}
      </div>
    )
  }
}

export default EditableWidget
