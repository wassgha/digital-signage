import { Component } from 'react'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowRestore } from '@fortawesome/free-regular-svg-icons'
import { faChromecast } from '@fortawesome/free-brands-svg-icons'
import { faTrash, faTv, faEye, faLink } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { view } from '@risingstack/react-easy-state'

import { deleteDisplay } from '../../actions/display'

class ScreenCard extends Component {
  render() {
    const { value, refresh = () => {} } = this.props
    return (
      <Link href={'/layout?display=' + value._id}>
        <div className='card'>
          <div className='left'>
            <div className={'thumbnail'}>
              <FontAwesomeIcon icon={faTv} fixedWidth size='lg' color='#7bc043' />
            </div>
          </div>
          <div className='middle'>
            <div className='title'>{value.name || 'Untitled Display'}</div>
            <div className='info'>
              <div className='widgetnum'>
                <div className='icon'>
                  <FontAwesomeIcon icon={faWindowRestore} fixedWidth color='#878787' />
                </div>
                <span className='text'>{value.widgets.length} widgets</span>
              </div>
              <div className='clientnum'>
                <div className='icon'>
                  <FontAwesomeIcon icon={faChromecast} fixedWidth color='#878787' />
                </div>
                <span className='text'>1 client paired</span>
              </div>
              <div className='online'>
                <span className='text'>online</span>
              </div>
            </div>
          </div>
          <div className='right'>
            <Link href={'/layout?display=' + value._id}>
              <div className='actionIcon'>
                <FontAwesomeIcon icon={faEye} fixedWidth color='#828282' />
              </div>
            </Link>
            <Link href={'/display/' + value._id}>
              <div className='actionIcon'>
                <FontAwesomeIcon icon={faLink} fixedWidth color='#828282' />
              </div>
            </Link>
            <div className='actionIcon'>
              <FontAwesomeIcon
                icon={faTrash}
                fixedWidth
                color='#828282'
                onClick={e => {
                  if (e) e.stopPropagation()
                  deleteDisplay(value._id).then(refresh)
                }}
              />
            </div>
          </div>
          <style jsx>
            {`
              .card {
                padding: 12px;
                font-family: 'Open Sans', sans-serif;
                border-radius: 4px;
                cursor: pointer;
                background: white;
                margin-top: 40px;
                margin-bottom: 40px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                position: relative;
                z-index: 1;
              }

              .title {
                font-family: 'Open Sans', sans-serif;
                font-size: 16px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: #4f4f4f;
                margin-bottom: 8px;
              }

              .left {
                font-family: 'Open Sans', sans-serif;
                justify-content: center;
                padding-left: 8px;
                padding-right: 8px;
              }

              .info {
                display: flex;
                flex-direction: row;
              }

              .widgetnum,
              .online,
              .clientnum {
                font-family: 'Open Sans', sans-serif;
                font-size: 14px;
                color: #878787;
                margin-right: 8px;
              }

              .widgetnum .icon,
              .online .icon,
              .clientnum .icon {
                margin-right: 4px;
                display: inline;
                vertical-align: middle;
              }

              .widgetnum .text,
              .online .text,
              .clientnum .text {
                vertical-align: middle;
              }

              .online {
                color: #7bc043;
              }

              .online::before {
                content: '•';
                color: #7bc043;
                font-size: 32px;
                vertical-align: middle;
                line-height: 16px;
                padding-right: 4px;
              }

              .middle {
                font-family: 'Open Sans', sans-serif;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding-left: 8px;
                padding-right: 8px;
                flex: 1;
                min-width: 0;
              }

              .right {
                display: flex;
                flex-direction: row;
                font-family: 'Open Sans', sans-serif;
                justify-content: center;
                align-items: center;
                padding-left: 8px;
                padding-right: 8px;
              }

              .thumbnail {
                height: 60px;
                width: 60px;
                background-size: cover;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .actionIcon {
                margin-right: 16px;
                margin-left: 16px;
              }
            `}
          </style>
        </div>
      </Link>
    )
  }
}

export default view(ScreenCard)
