import { Component } from 'react'
import React from 'react'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'
import SlideCard from './SlideCard'

import { getSlides } from '../actions/slide'

const SortableItem = SortableElement(SlideCard)

const SortableList = SortableContainer(({ items, refresh }) => {
  return (
    <div className={'list'}>
      <div className={'timeline'} />
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} refresh={refresh} />
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

class SlideList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      slides: []
    }
  }

  componentDidMount() {
    getSlides().then(slides => {
      this.setState({
        slides: slides.sort((a, b) => a.order - b.order)
      })
    })
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ slides }) => ({
      slides: arrayMove(slides, oldIndex, newIndex)
    }))
  }

  refresh = () => {
    getSlides().then(slides => {
      this.setState({
        slides: slides.sort((a, b) => a.order - b.order)
      })
    })
  }

  render() {
    const { slides } = this.state
    return (
      <SortableList
        items={slides}
        refresh={this.refresh}
        onSortEnd={this.onSortEnd}
        distance={2}
        lockAxis='y'
      />
    )
  }
}

export default SlideList
