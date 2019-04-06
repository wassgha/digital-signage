import { Component } from 'react'
import React from 'react'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faTrash, faEdit, faPlay, faGlobe } from '@fortawesome/free-solid-svg-icons'

/* eslint-disable */
const MOCK_SLIDES = [
  {
    type: 'photo',
    data:
      'https://compsci.lafayette.edu/wp-content/uploads/sites/66/2010/05/computerSci-homepage.jpg',
    title: 'Welcome to the Computer Science Department',
    desc:
      'Welcome to the fifth floor of the Acopian Engineering Center, home of the Computer Science department!',
    duration: 3, // In seconds
    order: 2
  },
  {
    type: 'photo',
    data:
      'https://news.lafayette.edu/wp-content/blogs.dir/2/files/2018/12/STEM-professors-470x264.jpg',
    title: 'Hidden Figures Week',
    desc:
      'Hidden Figures Week explored issues related to women in STEM through a roundtable faculty discussion.',
    duration: 2, // In seconds
    order: 1
  },
  {
    type: 'web',
    data: 'https://compsci.lafayette.edu/courses/',
    title: 'Classes Website Example',
    desc: '',
    duration: 4, // In seconds
    order: 3
  },

  {
    type: 'youtube',
    data: 'https://www.youtube.com/watch?v=xcs-xnc25-I',
    title: "The President's Challenge: Bring the Best",
    desc:
      "Saeed Malami '20 and Lillian Kennedy '21 talk about the impact Lafayette College has had on their lives and the role donors have played in making this possible.",
    duration: 10, // In seconds
    order: 4
  }
]
/* eslint-enable */

const SortableItem = SortableElement(({ value }) => (
  <div className='card'>
    <div className='order'>{value.order}</div>
    <div className='left'>
      <div
        className={'thumbnail'}
        style={{
          backgroundImage: `url(${value.data})`,
          backgroundColor:
            value.type == 'youtube' ? '#c23616' : value.type == 'web' ? '#0097e6' : 'transparent'
        }}
      >
        {value.type == 'youtube' && (
          <FontAwesomeIcon icon={faPlay} fixedWidth size='lg' color='#FFFFFF' />
        )}
        {value.type == 'web' && (
          <FontAwesomeIcon icon={faGlobe} fixedWidth size='lg' color='#FFFFFF' />
        )}
      </div>
    </div>
    <div className='middle'>
      <div className='title'>{value.title}</div>
      <div className='duration'>
        <div className='icon'>
          <FontAwesomeIcon icon={faClock} fixedWidth color='#878787' />
        </div>
        <span className='text'>{value.duration}s</span>
      </div>
    </div>
    <div className='right'>
      <div className='actionIcon'>
        <FontAwesomeIcon icon={faEdit} fixedWidth color='#828282' />
      </div>
      <div className='actionIcon'>
        <FontAwesomeIcon icon={faTrash} fixedWidth color='#828282' />
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

        .order {
          font-family: 'Open Sans', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-left: 8px;
          padding-right: 8px;
          color: #878787;
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
))

const SortableList = SortableContainer(({ items }) => {
  return (
    <div className={'list'}>
      <div className={'timeline'} />
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
      <style jsx>
        {`
          .list {
            position: relative;
          }
          .timeline {
            width: 4px;
            height: calc(100% - 20px);
            border-radius: 2px;
            position: absolute;
            left: 50%;
            top: 10px;
            margin-left: -2px;
            background: #cccccc;
            z-index: 0;
          }
        `}
      </style>
    </div>
  )
})

class List extends Component {
  state = {
    items: MOCK_SLIDES.sort((a, b) => a.order - b.order)
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex)
    }))
  }
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} lockAxis='y' />
  }
}

export default List
