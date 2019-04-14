import { Component } from 'react'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faTrash, faEdit, faPlay } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

import { deleteSlideshow } from '../actions/slideshow'

class SlideshowCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { value, refresh = () => {} } = this.props
    return (
      <div className='card'>
        <div className='left'>
          <div
            className={'thumbnail'}
            style={{
              // backgroundImage: `url(${value.data})`,
              backgroundColor: 'gray'
            }}
          >
            <FontAwesomeIcon icon={faPlay} fixedWidth size='lg' color='#FFFFFF' />
          </div>
        </div>
        <div className='middle'>
          <div className='title'>{value.title || 'Untitled Slideshow'}</div>
          <div className='duration'>
            <div className='icon'>
              <FontAwesomeIcon icon={faClock} fixedWidth color='#878787' />
            </div>
            <span className='text'>
              {value.slides.reduce((acc, slide) => acc + slide.duration, 0)}s
            </span>
          </div>
        </div>
        <div className='right'>
          <Link href={'/slideshow/' + value._id}>
            <div className='actionIcon'>
              <FontAwesomeIcon icon={faEdit} fixedWidth color='#828282' />
            </div>
          </Link>
          <div className='actionIcon'>
            <FontAwesomeIcon
              icon={faTrash}
              fixedWidth
              color='#828282'
              onClick={() => deleteSlideshow(value._id).then(refresh)}
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
            }

            .left {
              font-family: 'Open Sans', sans-serif;
              justify-content: center;
              padding-left: 8px;
              padding-right: 8px;
            }

            .duration {
              font-family: 'Open Sans', sans-serif;
              font-size: 14px;
              color: #878787;
            }

            .duration .icon {
              margin-right: 4px;
              display: inline;
              vertical-align: middle;
            }

            .duration .text {
              vertical-align: middle;
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
              border-radius: 2px;
              background-size: cover;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .actionIcon {
              margin-right: 8px;
              margin-left: 8px;
            }
          `}
        </style>
      </div>
    )
  }
}

export default SlideshowCard
