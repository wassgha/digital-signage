import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import {
  faPlay,
  faFont,
  faList,
  faMousePointer,
  faCloudSun,
  faCalendar,
  faTimes,
  faCog
} from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false
library.add(faList)
library.add(faPlay)
library.add(faFont)
library.add(faMousePointer)
library.add(faCloudSun)
library.add(faCalendar)

import Widgets from '../../widgets'
import WidgetEditDialog from './WidgetEditDialog'

class EditableWidget extends React.Component {
  constructor(props) {
    super(props)
    this.dialog = React.createRef()
  }

  open = e => {
    if (e) e.stopPropagation()
    this.dialog && this.dialog.current.open()
  }

  deleteClicked = e => {
    if (e) e.stopPropagation()
    const { onDelete = () => {} } = this.props
    onDelete()
  }

  render() {
    const { type = 'slideshow', id, layout = 'spaced' } = this.props
    const widget = Widgets[type] || {}
    return (
      <div className={'widget'}>
        <div className={'controls'}>
          <div className={'edit'} onClick={this.open}>
            <FontAwesomeIcon icon={faCog} size={'xs'} fixedWidth />
          </div>
          <div className={'delete'} onClick={this.deleteClicked}>
            <FontAwesomeIcon icon={faTimes} size={'xs'} fixedWidth />
          </div>
        </div>
        <div className={'info'}>
          <div className={'icon'}>
            <FontAwesomeIcon icon={widget.icon || faTimes} size={'2x'} />
          </div>
          <span className={'type'}>{widget.name || 'Broken Widget'}</span>
        </div>
        <WidgetEditDialog ref={this.dialog} OptionsComponent={widget.Options} id={id} />
        <style jsx>
          {`
            .widget {
              background-color: rgba(108, 108, 108, 1);
              border-radius: ${layout == 'spaced' ? '6px' : '0px'};
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              padding: 8px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              cursor: move;
              overflow: hidden;
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
              font-size: 14px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 100%;
            }
            .widget .info .name {
              color: white;
              font-family: 'Open Sans', sans-serif;
              text-transform: uppercase;
              font-size: 12px;
            }
            .widget .controls {
              position: absolute;
              font-family: 'Open Sans', sans-serif;
              top: 8px;
              right: 8px;
              justify-content: center;
              align-items: center;
              display: none;
            }
            .widget .delete,
            .widget .edit {
              display: flex;
              font-family: 'Open Sans', sans-serif;
              top: 8px;
              right: 8px;
              width: 32px;
              height: 32px;
              justify-content: center;
              align-items: center;
              color: white;
              border-radius: 50%;
              cursor: pointer;
            }

            .widget .edit {
              background: rgba(0, 0, 0, 0.6);
              margin-right: 8px;
            }

            .widget .delete {
              background: rgba(252, 50, 50, 0.6);
            }

            .widget:hover .controls {
              display: flex;
            }
          `}
        </style>
      </div>
    )
  }
}

export default EditableWidget
